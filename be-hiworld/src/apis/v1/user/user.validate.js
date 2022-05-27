import Joi from "joi";

const id = Joi.number().messages({
    "number.base": `Kiểu dữ liệu của id phải là number`,
    "number.empty": `Vui lòng không để trống id người dùng`,
    "any.required": `Vui lòng điền id người dùng`
});

const email = Joi.string().pattern(new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")).allow(null).messages({
    "string.base": `Kiểu dữ liệu của email phải là string`,
    "string.pattern.base": `Email không hợp lệ`,
    "string.empty": `Vui lòng không để trống email`
});

const password = Joi.string().required().min(6).max(20).messages({
    "string.base": `Kiểu dữ liệu của mật khẩu phải là string`,
    "any.required": `Vui lòng điền mật khẩu`,
    "string.empty": `Vui lòng không để trống mật khẩu`,
    "string.min": `Số ký tự tối thiểu cho mật khẩu là {#limit} ký tự`,
    "string.max": `Số ký tự tối đa cho mật khẩu là {#limit} ký tự`
});

const currentPassword = Joi.string().required().min(6).max(20).messages({
    "string.base": `Kiểu dữ liệu của mật khẩu phải là string`,
    "any.required": `Vui lòng điền mật khẩu hiện tại`,
    "string.empty": `Vui lòng không để trống mật khẩu`,
    "string.min": `Số ký tự tối thiểu cho mật khẩu hiện tại là {#limit}`,
    "string.max": `Số ký tự tối đa cho mật khẩu hiện tại là {#limit}`
});

const confirmPassword = Joi.string().required().min(6).max(20).equal(Joi.ref("password")).messages({
    "string.base": `Kiểu dữ liệu xác nhận mật khẩu phải là string`,
    "any.required": `Vui lòng điền xác nhận mật khẩu`,
    "string.empty": `Vui lòng điền xác không để trống mật khẩu`,
    "string.min": `Số ký tự tối thiểu cho xác nhận mật khẩu là {#limit} ký tự`,
    "string.max": `Số ký tự tối đa cho xác nhận mật khẩu là {#limit} ký tự`,
    "any.only": `Xác nhận mật khẩu không khớp`
});

const firstName = Joi.string().required().min(2).max(20).messages({
    "string.base": `Kiểu dữ liệu của tên phải là string`,
    "any.required": `Vui lòng điền tên`,
    "string.empty": `Vui lòng không để trống tên`,
    "string.min": `Số ký tự tối thiểu cho tên là {#limit} ký tự`,
    "string.max": `Số ký tự tối đa cho tên là {#limit} ký tự`
});

const lastName = Joi.string().required().min(2).max(20).messages({
    "string.base": `Kiểu dữ liệu của họ phải là string`,
    "any.required": `Vui lòng điền họ`,
    "string.empty": `Vui lòng không để trống họ`,
    "string.min": `Số ký tự tối thiểu cho họ là {#limit} ký tự`,
    "string.max": `Số ký tự tối đa cho họ là {#limit} ký tự`
});

const gender = Joi.string().allow(null).messages({
    "string.base": `Kiểu dữ liệu của giới tính phải là string`,
    "string.empty": `Vui lòng không để trống giới tính`
});

const role = Joi.string().messages({
    "string.base": `Kiểu dữ liệu của vai trò phải là string`,
    "string.empty": `Vui lòng không để trống vai trò`
});

const imageId = Joi.string().allow(null).messages({
    "string.base": `Kiểu dữ liệu của ảnh đại diện phải là string`,
    "string.empty": `Vui lòng điền id ảnh đại diện`
});

const imageUrl = Joi.string().allow(null).messages({
    "string.base": `Kiểu dữ liệu của url ảnh đại diện phải là string`,
    "string.empty": `Vui lòng không để trống url ảnh đại diện`
});

const initUserValidate = {
    id: id,
    email: email,
    password: password,
    currentPassword: currentPassword,
    confirmPassword: confirmPassword,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    imageId: imageId,
    imageUrl: imageUrl,
    role: role
};

const updateUserValidate = { ...initUserValidate };
const createUserValidate = { ...initUserValidate };

["email", "password", "currentPassword", "confirmPassword"].map((e) => delete updateUserValidate[e]);

const userValidate = {};
userValidate.createUser = Joi.object().keys(createUserValidate);
userValidate.updateUser = Joi.object().keys(updateUserValidate);

export default userValidate;
