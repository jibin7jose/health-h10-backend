import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });

  async sendLoginOtpEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"TABB APP" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Login Verification Code',
      html: `<h2>Your Login OTP:</h2><h1>${otp}</h1><p>Valid for 10 minutes.</p>`,
    });
  }

  async sendResetPasswordEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"TABB APP" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code',
      html: `<h2>Password Reset</h2><h1>${otp}</h1><p>Valid for 10 minutes.</p>`,
    });
  }
}
