import cloudinary from "cloudinary";
import { config } from "../utils";

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

const uploadCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, { folder: config.CLOUDINARY_DIRECTORY_CONTAIN_IMAGE }, (error, result) => {
            if (error) throw error;

            resolve({
                imageUrl: result.url,
                imageId: result.public_id
            });
        });
    });
};

const deleteImageCloudinary = async (imageId) => {
    if (!imageId) return { code: 1, msg: "Không có ảnh nào được chọn để xóa !" };

    const deleteImage = await cloudinary.v2.uploader.destroy(imageId);
    if (deleteImage.result === "ok") {
        return { code: 0, msg: "Xóa ảnh thành công" };
    } else {
        return { code: 2, msg: `Không tìm thấy thư mục ở cloudinary` };
    }
};

export { uploadCloudinary, deleteImageCloudinary };
