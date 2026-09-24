import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/houses/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + path.extname(file.originalname)
        );
    }
});

const uploadHouseImages = multer({ storage });

export default uploadHouseImages;