export declare class MailService {
    private transporter;
    sendResetPasswordEmail(email: string, token: string): Promise<void>;
}
