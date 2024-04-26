import { Request, Response, NextFunction } from 'express';
import { ResponseTemp } from '../lib/responseTemplate';
import { z } from "zod";

interface ErrorMessages {
    email?: string;
    password?: string;
    [key: string]: string | undefined; 
}

export function validate(pathname: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (pathname === "login") {
            const response: ResponseTemp<Object> = {
                data: {
                    message: null
                },
                error: {
                    message: null
                }
            };

            const loginSchema = z.object({
                email: z.string().email(),
                password: z.string().min(4)
            });

            const loginData = loginSchema.safeParse(req.body);
            if (loginData.success) return next();

            const loginErrorReasons: ErrorMessages = {
                email: "",
                password: ""
            };

            loginData.error?.errors.forEach((el) => {
                const errorPath = el.path[0];
                loginErrorReasons[errorPath] = el.message;
            });

            response.error = {
                errors: loginErrorReasons
            };

            res.status(401).json(response);
        }
        if(pathname == "register"){
            const response: ResponseTemp<Object> = {
                data: {
                    message: null
                },
                error: {
                    message: null
                }
            };

            const registerSchema = z.object({
                email: z.string().email(),
                password: z.string().min(4),
                full_name : z.string()
            });

            const registerData = registerSchema.safeParse(req.body);
            if (registerData.success) return next();

            const loginErrorReasons: ErrorMessages = {
                email: "",
                password: "",
                full_name : ""
            };

            registerData.error?.errors.forEach((el) => {
                const errorPath = el.path[0];
                loginErrorReasons[errorPath] = el.message;
            });

            response.error = {
                errors: loginErrorReasons
            };

            res.status(401).json(response);
            
        }
        if(pathname == "forget_password"){
            const response: ResponseTemp<Object> = {
                data: {
                    message: null
                },
                error: {
                    message: null
                }
            };

            const forgetPasswordSchema = z.object({
                email: z.string().email()
            });

            const forgetPasswordData = forgetPasswordSchema.safeParse(req.body);
            if (forgetPasswordData.success) return next();

            const loginErrorReasons: ErrorMessages = {
                email: "",
            };

            forgetPasswordData.error?.errors.forEach((el) => {
                const errorPath = el.path[0];
                loginErrorReasons[errorPath] = el.message;
            });

            response.error = {
                errors: loginErrorReasons
            };

            res.status(401).json(response);
            
        }
    };
}
