import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){

    try {

        const reqBody = await request.json()
        const {email, password} =  reqBody

        

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({
                error:"User not found"
            },{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            toast.error("Invalid password")
            return NextResponse.json({
                error:"Invalid password"
            },{status:400})
        }

        //create a token 

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

    const token =  jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"2h"})
    const response = NextResponse.json({
            message:"Login successful",
            success:true,

    })

    response.cookies.set("token",token,{
        httpOnly:true,
        

    })
    return response


        
    } catch (error: any) {

        return NextResponse.json({
            error:error.message
        },{status:500})
        
    }

}