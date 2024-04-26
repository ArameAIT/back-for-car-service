import crypto from "crypto"

export function hashingPassword(password : string) {
    const hashedPassword = crypto.createHash('sha256')
        .update(password)
        .digest('hex')

    return hashedPassword
}

export function isPasswordTrue(hashedPassword : string, password : string) : Boolean {
    return hashedPassword == password
}