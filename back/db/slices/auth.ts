import pool from "../index";

export interface Admin {
    id: number;
    email: string;
    full_name: string;
    password: string;
}

export async function getAdmins(): Promise<Admin[] | undefined> {
    try {
        const result = await pool.query("SELECT * FROM admins");

        if (Array.isArray(result) && result.length > 0) {
            return result[0] as Admin[];
        } else {
            return undefined;
        }
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
}

export async function addAdmins(email : string, password : string, full_name : string) : Promise<void>{
    const result = pool.query("INSERT INTO admins (email,password,full_name) VALUES (?,?,?)",[email,password,full_name])    
}

export async function addVerificationCode(code : string,id : number ) : Promise<void>{
    const result = pool.query("UPDATE admins SET verification_code = ? WHERE id = ?",[code,id])
}