import nodemailer from 'nodemailer';
import User from "@/models/userModel.js";
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId:any}) => {

    try {
        
    } catch (error:any) {
        throw new Error(error.message);
        
    }

}