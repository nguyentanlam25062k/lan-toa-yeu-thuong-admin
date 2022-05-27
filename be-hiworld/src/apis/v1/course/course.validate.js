import Joi from 'joi';

const _id = Joi.string().required().messages({
  'string.base': `Kiểu dữ liệu của id phải là string`,
  'string.empty': `Vui lòng không để trống id khóa học`,
  'any.required': `Vui lòng điền id khóa học`,
});

const name = Joi.string().required().min(2).max(50).messages({
  'string.base': `Kiểu dữ liệu của tên khóa học phải là string`,
  'any.required': `Vui lòng điền tên khóa học`,
  'string.empty': `Vui lòng không để trống tên khóa học`,
  'string.min': `Số kí tự tối thiểu cho tên khóa học {#limit} ký tự`,
  'string.max': `Số kí tự tối đa cho tên khóa học {#limit} ký tự`,
});

const desc = Joi.string().required().min(2).max(1000).messages({
  'string.base': `Kiểu dữ liệu của mô tả khóa học phải là string`,
  'any.required': `Vui lòng điền mô tả khóa học`,
  'string.empty': `Vui lòng không để trống mô tả khóa học`,
  'string.min': `Số kí tự tối thiểu cho mô tả khóa học {#limit} ký tự`,
  'string.max': `Số kí tự tối đa cho mô tả khóa học {#limit} ký tự`,
});

const image = Joi.any().allow(null);
const images = Joi.any().allow(null);

const publish = Joi.boolean().allow(null);

// const markdownHtml = Joi.string().allow(null).messages({
//     "string.base": `Kiểu dữ liệu của nội dung HTML khóa học  phải là string`,
//     "string.empty": `Vui lòng điền nội dung HTML khóa học`
// });

const content = Joi.string().allow(null).messages({
  'string.base': `Kiểu dữ liệu của nội dung khóa học phải là string`,
  'string.empty': `Vui lòng điền nội dung khóa học`,
});

const courseCategory = Joi.string().allow(null).messages({
  'string.base': `Kiểu dữ liệu của id danh sách khóa học phải là string`,
  'string.empty': `Vui lòng không để trống id danh sách khóa học`,
  'any.required': `Vui lòng điền id danh sách khóa học`,
});

const init = {
  _id: _id,
  name: name,
  desc: desc,
  image: image,
  images: images,
  publish: publish,
  // markdownHtml: markdownHtml,
  content: content,
  courseCategory: courseCategory,
};

const initCreate = { ...init };
const initEdit = { ...init };
const initDelete = { _id };

delete initCreate.id;

export const createCourseValidate = Joi.object().keys(initCreate);
export const editCourseValidate = Joi.object().keys(initEdit);
export const deleteCourseValidate = Joi.object().keys(initDelete);
