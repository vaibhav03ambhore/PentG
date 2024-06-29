import dotenv from 'dotenv';

import { v2 as cloudinary } from 'cloudinary';

import fs from 'fs'; 


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath,folderOnCloudinary) => {
    
    try {
    
        if (!localFilePath ) {
            throw new Error("File path not provided");
        }
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: `PenGProject/${folderOnCloudinary}`,
        });

        console.log("File uploaded successfully", res.secure_url);
        return res;

    } catch (err) {
        console.log("Error uploading file", err.message);
        if (err.http_code === 401) {
            console.error("Please provide valid Cloudinary credentials in .env file");
        }
        throw err; 
    } finally {
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting temporary file", err);
            } else {
                console.log("Temporary file deleted");
            }
        });
    }
};

export { uploadOnCloudinary };
