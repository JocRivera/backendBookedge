import { Resend } from "resend";

const resend = new Resend (process.env.RESEND_API_KEY)


export const sendResetPasswordEmail = async (email, resetLink) => {
    try {
      await resend.emails.send({
        from: "bookedgedevelops@gmail.com",
        to: email,
        subject: "Recuperación de Contraseña",
        html: `
          <h2>Recupera tu contraseña</h2>
          <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <a href="${resetLink}" style="color: blue; font-weight: bold;">Restablecer contraseña</a>
          <p>Este enlace expirará en 15 minutos.</p>
        `,
      });
    } catch (error) {
      throw new Error("Error al enviar el correo de recuperación.");
    }
  
}