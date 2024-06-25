import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename:(req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|| image\/webp/;

    const extname= path.extname(file.originalname);

    const mimetype= file.mimetype;

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        return cb(null, true);
    }else{
        cb(new Error('Images only!'));
    }


};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadSingleImage = upload.single('image');


router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400);
            throw new Error({error:err.message});
        }else if(req.file){
            res.status(200)
                .send({message: "Image uploaded successfully", image: req.file.path});

        }else{
            res.status(400);
            throw new Error('Image not found');
        }
        
    });
});



export default router;
