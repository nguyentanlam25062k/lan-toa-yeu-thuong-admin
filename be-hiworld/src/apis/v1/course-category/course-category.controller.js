import CourseCategory from './course-category.model';
import {
  createCourseCategoryValidate,
  editCourseCategoryValidate,
  deleteCourseCategoryValidate,
} from './course-category.validate';

import { APIfeatures, convertToSlug, generateShortId } from '../../../utils';

export const getCourseCategory = async (queryRequest) => {
  try {
    const features = new APIfeatures(CourseCategory.find(), queryRequest)
      .paginating()
      .sorting()
      .searching()
      .filtering();

    const [category, count] = await Promise.all([features.query, CourseCategory.countDocuments()]);

    return { code: 0, body: { category, count }, msg: 'Lấy danh mục khóa học thành công !' };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};
export const createCourseCategory = async (cateRequest) => {
  try {
    const { error, value } = createCourseCategoryValidate.validate(cateRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const { name, parentId = null } = value;
    let slug = convertToSlug(name);

    const [cateFindByName, cateFindBySlug, cateParentFindById] = await Promise.all([
      CourseCategory.findOne({ name }).exec(),
      CourseCategory.findOne({ slug }).exec(),
      CourseCategory.findOne({ _id: parentId }).exec(),
    ]);

    if (cateFindByName) return { code: 2, msg: 'Tên danh mục đã tồn tại !' };

    if (cateFindBySlug) slug = slug + '-' + generateShortId();

    if (cateParentFindById?.parentId && parentId) return { code: 3, msg: 'Danh mục khóa học chỉ cho phép 2 cấp !' };

    await new CourseCategory({ name, slug, parentId: parentId }).save();
    return { code: 0, msg: 'Tạo mới danh mục khóa học thành công !' };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const editCourseCategory = async (cateRequest) => {
  try {
    const { error, value } = editCourseCategoryValidate.validate(cateRequest);
    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const { id, name, parentId } = value;
    let slug = convertToSlug(name);

    const [cateFindById, cateFindByName, cateFindBySlug, cateParentFindById] = await Promise.all([
      CourseCategory.findOne({ _id: id }).exec(),
      CourseCategory.findOne({ name }).exec(),
      CourseCategory.findOne({ slug }).exec(),
      CourseCategory.findOne({ _id: parentId }).exec(),
    ]);

    if (!cateFindById) return { code: 2, msg: 'Không tìm thấy id danh mục khóa học !' };

    if (cateFindByName) return { code: 3, msg: 'Tên danh mục đã tồn tại !' };

    if (cateFindBySlug) {
      slug = slug + '-' + generateShortId();
    }

    if (cateParentFindById?.parentId && parentId) return { code: 4, msg: 'Danh mục khóa học chỉ cho phép 2 cấp !' };

    cateFindById.name = name;
    cateFindById.parentId = parentId;
    cateFindById.slug = slug;

    await cateFindById.save();
    return { code: 0, msg: 'Cập nhập danh mục khóa học thành công !' };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};
export const deleteCourseCategory = async (cateRequest) => {
  try {
    const { error, value } = deleteCourseCategoryValidate.validate(cateRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const [cateFindById, childCatesFindByParentId] = await Promise.all([
      CourseCategory.findOne({ _id: value.id }),
      CourseCategory.find({ parentId: value.id }),
    ]);

    if (!cateFindById || cateFindById.status === false) {
      return { code: 2, msg: 'Không tìm thấy id danh mục khóa học !' };
    }

    if (childCatesFindByParentId.length > 0) {
      return { code: 3, msg: 'Vui lòng xóa hết tất cả danh mục con của danh mục này !' };
    }

    cateFindById.status = false;
    await cateFindById.save();

    return { code: 0, msg: 'Xóa danh mục khóa học thành công !' };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};
