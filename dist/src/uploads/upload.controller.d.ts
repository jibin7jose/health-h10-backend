export declare class UploadController {
    uploadImage(file: Express.Multer.File): {
        message: string;
        url: string;
        filename: string;
    };
}
