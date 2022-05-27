import Joi from 'joi';

const email = Joi.string()
  .pattern(new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'))
  .required()
  .messages({
    'string.base': `Kiểu dữ liệu của email phải là string`,
    'string.pattern.base': `Email không hợp lệ`,
    'string.empty': `Vui lòng không để trống email`,
    'any.required': `Vui lòng điền email`,
  });

const firstName = Joi.string().required().min(2).max(20).messages({
  'string.base': `Kiểu dữ liệu của tên phải là string`,
  'any.required': `Vui lòng điền tên`,
  'string.empty': `Vui lòng không để trống tên`,
  'string.min': `Số ký tự tối thiểu cho tên là {#limit} ký tự`,
  'string.max': `Số ký tự tối đa cho tên là {#limit} ký tự`,
});

const lastName = Joi.string().required().min(2).max(20).messages({
  'string.base': `Kiểu dữ liệu của họ phải là string`,
  'any.required': `Vui lòng điền họ`,
  'string.empty': `Vui lòng không để trống họ`,
  'string.min': `Số ký tự tối thiểu cho họ là {#limit} ký tự`,
  'string.max': `Số ký tự tối đa cho họ là {#limit} ký tự`,
});

const gender = Joi.number().required().valid('male', 'female').messages({
  'string.base': `Kiểu dữ liệu của giới tính phải là number`,
  'any.required': `Vui lòng điền giới tính`,
  'string.empty': `Vui lòng không để trống giới tính`,
  'any.only': `Trường giới tính chỉ cho phép male hoặc female`,
});

const password = Joi.string().required().min(6).max(20).messages({
  'string.base': `Kiểu dữ liệu của mật khẩu phải là string`,
  'any.required': `Vui lòng điền mật khẩu`,
  'string.empty': `Vui lòng không để trống mật khẩu`,
  'string.min': `Số ký tự tối thiểu cho mật khẩu là {#limit} ký tự`,
  'string.max': `Số ký tự tối đa cho mật khẩu là {#limit} ký tự`,
});

const newPassword = Joi.string().required().min(6).max(20).messages({
  'string.base': `Kiểu dữ liệu của mật khẩu mới phải là string`,
  'any.required': `Vui lòng điền mật khẩu mới hiện tại`,
  'string.empty': `Vui lòng không để trống mật khẩu mới`,
  'string.min': `Số ký tự tối thiểu cho mật khẩu mới là {#limit}`,
  'string.max': `Số ký tự tối đa cho mật khẩu mới là {#limit}`,
});

const initSignUp = { firstName, lastName, gender, email, password };
const initLogin = { email, password };
const initForgotPassword = { email };
const initChangePassword = { email, password, newPassword };

export const signUpValidate = Joi.object().keys(initSignUp);
export const loginValidate = Joi.object().keys(initLogin);
export const forgotPasswordValidate = Joi.object().keys(initForgotPassword);
export const changePasswordValidate = Joi.object().keys(initChangePassword);
