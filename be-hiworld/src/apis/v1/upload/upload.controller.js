// import { removeTempFile, uploadCloudinary } from "../../../utils";
// import cloudinary from "cloudinary";
// const uploadController = {};

// uploadController.uploadImage = async (images) => {
//     try {
//         return { code: 0, msg: "Upload images thành công" };
//     } catch (e) {
//         console.log(e);
//         return { code: -1, msg: "Lỗi từ server !" };
//     }
// };

// uploadController.deleteImage = async (uploadRequest) => {
//     try {
//         const { imageId } = uploadRequest;
//         if (!imageId) return { code: 1, msg: "Không có ảnh nào được chọn để xóa !" };

//         const deleteImage = await cloudinary.v2.uploader.destroy(imageId);
//         if (deleteImage.result === "ok") {
//             return { code: 0, msg: "Xóa ảnh thành công" };
//         } else {
//             return { code: 2, msg: `Không tìm thấy thư mục ở cloudinary` };
//         }
//     } catch (e) {
//         console.log(e);
//         return { code: -1, msg: "Lỗi từ server !" };
//     }
// };

// export default uploadController;
