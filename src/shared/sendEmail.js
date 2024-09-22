import nodemailer  from "nodemailer"

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    console.log(EmailTo)
  let transporter = nodemailer.createTransport({
    host: "mail.ownfood.com.bd",
    port: 587,
    secure: false,
    auth: {
      user: "noreply@ownfood.com.bd",
      pass: "HD@OWNFOOD4321",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOption = {
    from: "OwnFood Account <noreply@ownfood.com.bd>",
    to: EmailTo,
    subject: EmailSubject,
    html: EmailText,
  };
  

  const test = await transporter.sendMail(mailOption);
  return test;
};
export default SendEmailUtility
