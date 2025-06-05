import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDatafromToken = (request: NextRequest)=>{
    try {
        const token = request.cookies.get('token')?.value || '';
        const decoded:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return decoded.id;

    

    } catch (error) {
        throw new Error("Error extracting data from token");
        
    }
}