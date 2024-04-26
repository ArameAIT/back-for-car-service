import jwt from "jsonwebtoken"

export function giveToken(id : number) : string{
    const token = jwt.sign({adminID : id}, "shhhhhhh")
    return token
}

export function verifyToken(token : string) : string | number {
    try{
        const verifying : any = jwt.verify(token,"shhhhhhh")
        return verifying.adminID 
    }catch(err){
        return "invalid token"
    }
}