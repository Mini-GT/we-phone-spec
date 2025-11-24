import { productionUrl } from "@/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplatePath = path.join(
  __dirname,
  "../templates/verificationEmail.html"
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

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

  async sendVerificationEmail(
    username: string | null,
    email: string,
    token: string
  ) {
    const verificationUrl = `${productionUrl}/email/verify-email?verifyToken=${encodeURIComponent(
      token
    )}`;

    const htmlContent = emailTemplate
      .replace(/John Doe/g, username || "user")
      .replace(
        /https:\/\/yourapp\.com\/verify\?token=abc123xyz/g,
        verificationUrl
      )
      .replace(/abc123xyz789/g, token);

    // const error = false;
    const { error } = await resend.emails.send({
      from: "WePhoneSpec <noreply@wephonespec.site>",
      to: email,
      subject: "Email verification",
      html: htmlContent,
    });

    if (error) {
      return false;
    }

    return true;
  }

  async sendEmailForgotPassword(email: string, token: string): Promise<void> {
    const verificationUrl = `${productionUrl}/password/reset?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`;

    await this.transporter.sendMail({
      from: `${process.env.TRANSPORT_FROM_EMAIL} <${process.env.TRANSPORT_FROM_NAME}>`,
      to: email,
      subject: "Reset Password",
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
