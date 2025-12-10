import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendResetPasswordEmail(email: string, token: string) {
    const resetCode = token.slice(0, 6).toUpperCase();

    await this.transporter.sendMail({
      from: `"TABB APP" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Verification Code',
      html: `
        <h2>Password Reset</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing:4px">${resetCode}</h1>
        <p>This code expires in 30 minutes.</p>
      `,
    });
  }
}
