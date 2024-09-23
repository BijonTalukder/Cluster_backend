import nodemailer from "nodemailer";

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  try {
    console.log("Sending email to:", EmailTo);

    let transporter = nodemailer.createTransport({
      host: "mail.clusterantivirus.com",
      port: 465,
      secure: true, 
      auth: {
        user:"noreply@clusterantivirus.com", 
        pass: "Sx6PytnOb2Ny", 
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOption = {
      from: "Account <noreply@clusterantivirus.com>",
      to: EmailTo,
      subject: EmailSubject,
      html: EmailText,
    };

    const response = await transporter.sendMail(mailOption);
    console.log("Email sent successfully:", response);

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent.");
  }
};

export default SendEmailUtility;
