import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config(); 

const resend = new Resend(process.env.RESEND_API_KEY); 

export const sendResetPasswordEmail = async (email, resetLink) => {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bookedgedevelops@gmail.com", 
      subject: "Recuperación de Contraseña",
      html: `
        <h2>Recupera tu contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" style="color: blue; font-weight: bold;">Restablecer contraseña</a>
        <p>Este enlace expirará en 15 minutos.</p>
      `,
    });

    console.log("Correo enviado:", result);
  } catch (error) {
    console.error("Error de Resend:", error); // 👈 esto nos da más información real
    throw new Error("Error al enviar el correo de recuperación.");
  }
};
