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
    const verificationUrl = `${process.env.BASE_URL}/email/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `${process.env.TRANSPORT_FROM_EMAIL} <${process.env.TRANSPORT_FROM_NAME}>`,
      to: email,
      subject: 'Verify Your Email',
      html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
    });
  }
}

export default new EmailService();