const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_SMTP,
            port: 587,                  
            secure: false,              
            auth:{
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        let info = await transporter.sendMail({
            from: 'Course Craft || ADMIN',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log("Mail Sent -> ",info);
        return info;

    } catch(error) {
        console.log("Mail Transport Error -> ",error);
    }
}
 
module.exports = mailSender;