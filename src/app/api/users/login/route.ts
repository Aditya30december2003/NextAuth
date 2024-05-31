import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextResponse  , NextRequest} from 'next/server';
connect();

export async function POST(request:NextRequest){
    try {
        const bodyReq = await request.json();
        const {email , password} = bodyReq;

        const user = await User.findOne({email})

        //check if user exists or not

        if(!user){
            return NextResponse.json({message:"User not found , sign up!"} , {status: 400})
            alert("User not found, Please signup!!")
        }


        const validPassword = await bcrypt.compare(password , user.password)

        if(!validPassword){
            return NextResponse.json({message:"Invalid password"} , {status: 400})
            alert("Invalid Password")
        }

        const tokenData ={
            id:user.id,
            email:user.email,
            password:user.password,
        }

        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn:"1d"})

        const response =NextResponse.json({
            message:"Login is successful",
            success:true,
        })

        response.cookies.set(token , "token" , {
            httpOnly:true,
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message} , {status:500})
    }
}