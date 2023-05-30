import nodemailer from 'nodemailer'

export const sendemail = async ({ to = "", message = "", subject = "" }) => {
    let transporter = nodemailer.createTransport({
        host: "127.0.0.1",
        port: 587,
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: "engmrwanmaged@gmail.com",
            pass: "uwbgpgodtxcgiysg",
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "engmrwanmaged@gmail.com", // sender address
        to,
        subject,
        html: message
    });

    console.log(info);
    if (info.accepted.length) {
        return true
    }
    return false

}


// import nodemailer from 'nodemailer'
// export const sendemail = async ({ to ="", message ="", subject ="" })=>
// {
// let transporter = nodemailer.createTransport({
//     host: "127.0.0.1",
//     port: 587,
//     secure: false, 
//     service:"gmail",
//     auth: {
//         user: "engmrwanmaged@gmail.com", 
//         pass: "uwbgpgodtxcgiysg", 
// }});

// let info = await transporter.sendMail({
//     from: "engmrwanmaged@gmail.com", 
//     to,
//     subject,
//     html: message, 
// })
// console.log(info);
// if (info.accepted.length)
// {
//   return true
// }
// return false
// };