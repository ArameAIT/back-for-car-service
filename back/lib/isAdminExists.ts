import { BodyOfReq } from "../controllers/auth";
import { Admin, getAdmins } from "../db/slices/auth";

export async function isAdminExists(body : BodyOfReq) : Promise<Admin | undefined>{
    const admins = await getAdmins()
    const admin = admins?.find((ad)=> ad.email == body.email)
    if(!admin){
        return undefined
    }else{
        return admin
    }

}