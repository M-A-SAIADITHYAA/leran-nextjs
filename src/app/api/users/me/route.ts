import { getDatafromToken } from "@/helpers/getDataFromToken";

import { NextRequest,NextResponse } from "next/server";

import User from "@/models/userModel.js";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDatafromToken(request);
        const user = await User.findOne({_id:userId}).select("-password ");
        return NextResponse.json({
            message:"user found",
            data:user
        })

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        
    }
}