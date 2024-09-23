import nodemailer  from "nodemailer"

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    console.log(EmailTo)
  let transporter = nodemailer.createTransport({
    host: "mail.clusterantivirus.com",
    port: 465,
    secure: false,
    auth: {
      user: "noreply@clusterantivirus.com",
      pass: "Sx6PytnOb2Ny",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOption = {
    from: " Account <noreply@clusterantivirus.com>",
    to: EmailTo,
    subject: EmailSubject,
    html: EmailText,
  };
  

  const test = await transporter.sendMail(mailOption);
  return test;
};
export default SendEmailUtility
