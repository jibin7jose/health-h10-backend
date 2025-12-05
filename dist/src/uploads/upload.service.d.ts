export declare class UploadService {
    private uploadsDir;
    storeFile(file: Express.Multer.File): Promise<{
        filename: string;
        url: string;
    }>;
    ensureUploads(): Promise<void>;
    static localStorage(): import("multer").StorageEngine;
}
