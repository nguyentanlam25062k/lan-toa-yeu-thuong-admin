import { hashPassword } from "../../../utils/bcrypt.util.js";
import User from "./user.model.js";
import userValidate from "./user.validate.js";

const userService = {};

userService.getUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = new User({ fistName: "lam", lastName: "nguyen" });
            const newUser = await user.save();
            resolve({
                code: 0,
                body: newUser,
                msg: "hello world"
            });
        } catch (e) {
            reject({
                code: -1,
                msg: "Lỗi từ server !"
            });
        }
    });
};

userService.createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { value, error } = userValidate.createUser.validate(data);
            if (!error) {
                const {
                    email,
                    password: userPassword,
                    userName,
                    firstName,
                    lastName,
                    gender,
                    imageId,
                    imageUrl,
                    role
                } = value;
                const [isExistUserName, isExistEmail] = await Promise.all([
                    User.findOne({ userName: userName }).exec(),
                    User.findOne({ email: email || "" }).exec()
                ]);

                if (!isExistUserName) {
                    if (!isExistEmail) {
                        const hashPasswordUser = await hashPassword(userPassword);
                        const user = new User({
                            email: email,
                            password: hashPasswordUser,
                            userName: userName,
                            firstName: firstName,
                            lastName: lastName,
                            gender: gender,
                            imageId: imageId,
                            imageUrl: imageUrl,
                            role: role || "R3"
                        });

                        const { password, ...newUser } = await user.save();

                        resolve({
                            code: 0,
                            msg: "Tạo mới người dùng thành công !",
                            body: newUser
                            // return for controller handle token
                        });
                    } else {
                        resolve({
                            code: 3,
                            msg: "Email của bạn đã tồn tại, vui lòng thử email khác !"
                        });
                    }
                } else {
                    resolve({
                        code: 2,
                        msg: "Tên tài khoản của bạn đã tồn tại, vui lòng thử tên khác !"
                    });
                }
            } else {
                resolve({
                    code: 1,
                    msg: error.details[0].message
                });
            }
        } catch (e) {
            console.log(e);
            reject({
                code: -1,
                msg: "Lỗi từ server !"
            });
        }
    });
};

userService.editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
        } catch (e) {
            reject({
                code: -1,
                msg: "Lỗi từ server !"
            });
        }
    });
};

userService.deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = data;
            if (id) {
                const user = await User.findOne({ id: id }).exec();
                if (user) {
                    await User.deleteOne({ id: id }).exec();
                    resolve({
                        code: 0,
                        msg: "Xóa người dùng thành công !"
                    });
                } else {
                    resolve({
                        code: 2,
                        msg: "Không tìm thấy id người dùng !"
                    });
                }
            } else {
                resolve({
                    code: 1,
                    msg: "Vui lòng gửi id người dùng muốn xóa !"
                });
            }
        } catch (e) {
            reject({
                code: -1,
                msg: "Lỗi từ server !"
            });
        }
    });
};

export default userService;
