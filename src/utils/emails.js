import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // tu correo Gmail
    pass: process.env.GMAIL_PASS, // tu contraseña o App Password
  },
});

export const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    const info = await transporter.sendMail({
      from: `"Los Lagos" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Recuperación de Contraseña",
      html: `
        <h2>Recupera tu contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" style="color: blue; font-weight: bold;">Restablecer contraseña</a>
        <p>Este enlace expirará en 15 minutos.</p>
      `,
    });
    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw new Error("Error al enviar el correo de recuperación.");
  }
};
