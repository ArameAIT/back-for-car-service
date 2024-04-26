import nodemailer from 'nodemailer';

export function generateVerificationCode(): string {
    return Math.random().toString(36).substr(2, 6);
}



export async function sendVerificationEmail(email: string, verificationCode: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        host : "mail.openjavascript.info",
        port : 465, 
        secure : true,
        auth: {
            user: 'test@openjavascript.info',
            pass: 'NodeMailer123!'
        }
    });

    const mailOptions = {
        from: 'OpenJavaScript <test@openjavascript.info>', 
        to: email, 
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    ``
    await transporter.sendMail(mailOptions);
}
