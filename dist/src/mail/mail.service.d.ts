export declare class MailService {
    transporter: any;
    sendLoginOtpEmail(email: string, otp: string): Promise<void>;
    sendResetPasswordEmail(email: string, otp: string): Promise<void>;
}
