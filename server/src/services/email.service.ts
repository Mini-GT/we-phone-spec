import { productionUrl } from "@/server";
import nodemailer from "nodemailer";

class EmailService {
  private transporter = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.TRANSPORT_EMAIL_USER,
    pass: process.env.TRANSPORT_EMAIL_PASSWORD,
  },
});

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${productionUrl}/email/verify-email?verifyToken=${encodeURIComponent(token)}`;

    await this.transporter.sendMail({
      from: `${process.env.TRANSPORT_FROM_EMAIL} <${process.env.TRANSPORT_FROM_NAME}>`,
      to: email,
      subject: 'Verify Your Email',
      html: `Click <a href="${verificationUrl}">here</a> to verify your email. *If you didn\'t request this, just ignore it.*`,
    });
  }

  async sendEmailForgotPassword(email: string, token: string): Promise<void> {
    const verificationUrl = `${productionUrl}/password/reset?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

    await this.transporter.sendMail({
      from: `${process.env.TRANSPORT_FROM_EMAIL} <${process.env.TRANSPORT_FROM_NAME}>`,
      to: email,
      subject: 'Reset Password',
      html: `
        <p>
          Click <a href="${verificationUrl}">here</a> to reset your password (expires in 24hrs). 
        </p>
        <p>
          <i style="font-style: italic;">
            If you didn\'t request this, please ignore it.
          </i>
        </p>
      `,
    });
  }
}

export default new EmailService();