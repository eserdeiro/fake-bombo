import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    /**
     * Uploads an image to Cloudinary.
     * 
     * @param file The image file to upload.
     * @returns A promise that resolves with the upload response or rejects with an error.
     */
    async uploadImage(
        file: Express.Multer.File
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            // Create an upload stream to Cloudinary with the specified folder.
            const upload = v2.uploader.upload_stream(
                { folder: 'files' },
                // Callback function to handle the upload result.
                (error, result) => {
                    // If an error occurs during upload, reject the promise with the error.
                    if (error) return reject(error);
                    // If the upload is successful, resolve the promise with the upload result.
                    resolve(result);
                }
            );

            // Convert the file buffer to a stream and pipe it to the upload stream.
            toStream(file.buffer).pipe(upload);
        });
    }
}
