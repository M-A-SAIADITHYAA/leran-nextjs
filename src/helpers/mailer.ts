import nodemailer from 'nodemailer';
import User from "@/models/userModel.js";
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) => {

    try {
        const hashedToken = await bcrypt.hash(userId,10)

        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, 
        {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000},
        {new:true,runValidators:true} )// 1 hour expiry}
            }
        else if(emailType === 'RESET') {
          await User.findByIdAndUpdate (userId,
            {forgotPasswordToken :hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000})
            }

        // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8cdd278202b5b2",
    pass: "1d6571dadb7fa7"
  }
});

const mailOptions = {
    from:'saiadithyaa2306@gmail.com',
    to: email,
    subject: emailType === 'verify' ? 'Verify your account' : 'Reset your password',
     html :`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`

}

const mailresponse = await transport.sendMail(mailOptions);
console.log("Email sent successfully", mailresponse);
return mailresponse;



        
        
    } catch (error:any) {
        throw new Error(error.message);
        
    }

}