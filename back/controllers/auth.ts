import { Admin, addAdmins, addVerificationCode, getAdmins } from "../db/slices/auth";
import { isAdminExists } from "../lib/isAdminExists";
import { ResponseTemp } from "../lib/responseTemplate";
import { Request, Response } from 'express';
import { giveToken } from "../lib/token";
import { hashingPassword, isPasswordTrue } from "../lib/hashingPassword";
// import {main } from "../lib/verificationCode";
import { generateVerificationCode, sendVerificationEmail } from "../lib/verificationCode";

export interface BodyOfReq {
    email: string,
    password: string,
    full_name?: string
}


export async function registerController(req: Request, res: Response) {
    const response: ResponseTemp<Object> = {
        data: {
            message: null
        },
        error: {
            message: null
        }
    }
    const body: BodyOfReq = req.body
    // console.log(body);
    const admin = await isAdminExists(body)
    // console.log(admin);

    if (admin) {
        response.error = {
            message: "Admin is already registered"
        }
        return res.status(401).json(response)
    }
    const hashedPassword = hashingPassword(body.password)


    if (typeof body.full_name == "string") {
        try {
            await addAdmins(body.email, hashedPassword + "", body.full_name)
        } catch (err) {
            console.log(err);
        }
    }

    response.data = {
        message: "You are registered"
    }

    res.status(200).json(response)
}

export async function loginController(req: Request, res: Response) {
    const response: ResponseTemp<Object> = {
        data: {
            message: null
        },
        error: {
            message: null
        }
    }

    // const adminsData = await getAdmins()
    // console.log(adminsData);
    const body: BodyOfReq = req.body
    // console.log(body.email);
    const admin: undefined | Admin = await isAdminExists(body)
    // console.log(admin);
    if (!admin) {
        response.error = {
            message: "Wrong email or password"
        }
        return res.status(401).json(response)
    }
    const hashedPassword = hashingPassword(body.password)
    const isSentedPasswordTrue = isPasswordTrue(hashedPassword, admin.password)
    if (!isSentedPasswordTrue) {
        response.error = {
            message: "You are not logined"
        }
        return res.status(401).json(response)
    }
    const token: string = giveToken(admin?.id)


    response.data = {
        message: "You are logined",
        token: token
    }

    res.status(200).json(response)

}

export async function forgetPasswordController(req: Request, res: Response) {
    const response: ResponseTemp<Object> = {
        data: {
            message: null
        },
        error: {
            message: null
        }
    }

    const body: BodyOfReq = req.body
    const admin: undefined | Admin = await isAdminExists(body)

    if (!admin) {
        response.error = {
            message: "You don't have an account"
        }
        return res.status(401).json(response)
    }

    const email = admin.email
    const verificationCode = generateVerificationCode();
    try {
        await addVerificationCode(verificationCode, admin.id)
        await sendVerificationEmail(email, verificationCode);
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
    // const verificationCode = generateVerificationCode();
    // sendVerificationEmail(email, verificationCode);
    // await main(admin.email)

    response.data = {
        message: "Your verification code was sent"
    }
    res.status(200).json(response)
}