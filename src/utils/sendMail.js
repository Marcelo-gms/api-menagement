const nodemailer = require("nodemailer");

const smtp_user = process.env.SMTP_USER;
const smtp_pass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: smtp_user,
    pass: smtp_pass,
  },
});

async function send(username, userEmail, message) {
  const info = await transporter.sendMail({
    from: userEmail,
    to: "smarcello023@gmail.com",
    subject: "Mensagem do portfolio",
    text: message,
    html: `
    <h3>Mensagem de ${username}</h3>
    <p>${message}</p>
    `,
  });

  console.log("Mensagem enviada com sucesso!");

  return await info.messageId;
}

module.exports = send;
