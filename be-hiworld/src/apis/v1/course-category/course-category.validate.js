import Joi from "joi";

const id = Joi.string().required().messages({
    "string.base": `Kiểu dữ liệu của id phải là string`,
    "string.empty": `Vui lòng không để trống id danh mục khóa học`,
    "any.required": `Vui lòng điền id danh mục khóa học`
});

const name = Joi.string().required().min(2).max(50).messages({
    "string.base": `Kiểu dữ liệu của tên danh mục khóa học phải là string`,
    "any.required": `Vui lòng điền tên danh mục khóa học`,
    "string.empty": `Vui lòng không để trống tên danh mục khóa học`,
    "string.min": `Số kí tự tối thiểu cho tên danh mục khóa học {#limit} ký tự`,
    "string.max": `Số kí tự tối đa cho tên danh mục khóa học {#limit} ký tự`
});

const parentId = Joi.string().allow(null).messages({
    "string.base": `Kiểu dữ liệu của id danh mục cha phải là string`,
    "string.empty": `Vui lòng không để trống id danh mục cha`
});

const initCreate = { name, parentId };
const initEdit = { id, name, parentId };
const initDelete = { id };

export const createCourseCategoryValidate = Joi.object().keys(initCreate);
export const editCourseCategoryValidate = Joi.object().keys(initEdit);
export const deleteCourseCategoryValidate = Joi.object().keys(initDelete);
