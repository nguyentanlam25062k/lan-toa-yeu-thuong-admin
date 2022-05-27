import multer from "multer";
import fs from "fs";

// {
//     destination: function (req, file, cb) {
//         if (!fs.existsSync("./public/uploads")) fs.mkdirSync("./public/uploads");
//         cb(null, "./public/uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
//     }
// }

const uploadMulter = multer({
    storage: multer.diskStorage({})
});

export { uploadMulter };
