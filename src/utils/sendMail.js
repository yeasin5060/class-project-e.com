import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: 'yasin.munshi9860@gmail.com',
      pass: 'nxnj cfyg mavp huvs',
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function mail(to , subject , text ="" , html ) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'yeasin', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

