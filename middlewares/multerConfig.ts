import multer from 'multer';
import path from 'path';

//Este es un middleware para manejar imagenes en una base de datos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    filename:(req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
    }
});


//Carga de imagen
export const upload = multer ({
    storage,
    limits: {fileSize: 2 * 1024 * 10245},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true)
        }

        cb(new Error('Solo se permite imagenes (jpeg, jpg, png, webp)'))
    }
})