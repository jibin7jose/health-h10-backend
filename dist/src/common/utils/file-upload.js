"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localFileStorage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.localFileStorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
};
//# sourceMappingURL=file-upload.js.map