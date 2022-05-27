import Course from './course.model';
import { createCourseValidate, editCourseValidate, deleteCourseValidate } from './course.validate';
import { APIfeatures, convertToSlug, generateShortId, uploadCloudinary } from '../../../utils';

export const getCourse = async (queryRequest) => {
  try {
    const features = new APIfeatures(
      Course.find({})
        .lean()
        .populate([
          { path: 'courseCategory', select: 'name' },
          { path: 'createUid', select: 'firstName lastName' },
        ]),
      queryRequest,
    )
      .paginating()
      .sorting()
      .searching()
      .filtering();
    const [course, count] = await Promise.all([features.query, Course.countDocuments()]);

    return { code: 0, body: { course, count }, msg: 'Lấy danh mục khóa học thành công !' };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const createCourse = async (courseRequest) => {
  try {
    let imageId = null,
      imageUrl = null,
      imageError,
      imageElement;

    const { error, value } = createCourseValidate.validate(courseRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const { name, image, ...restCourseRequest } = value;

    if (image) {
      imageError = image.error;
      imageElement = image.element;
    }

    if (imageError) return { code: 2, msg: 'Upload lỗi', body: imageError };

    let slug = convertToSlug(name);

    const [courseFindByName, courseFindBySlug] = await Promise.all([
      Course.findOne({ name }),
      Course.findOne({ slug }),
    ]);

    if (courseFindByName) return { code: 3, msg: 'Tên khóa học đã tồn tại !' };

    if (courseFindBySlug) slug = slug + '-' + generateShortId();

    if (image) {
      const imageCloud = await uploadCloudinary(imageElement.path);
      imageId = imageCloud.imageId;
      imageUrl = imageCloud.imageUrl;
    }

    await new Course({ name, slug, imageId, imageUrl, ...restCourseRequest }).save();

    return { code: 0, msg: 'Tạo mới khóa học thành công !' };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const editCourse = async (courseRequest) => {
  try {
    let imageError, imageElement;
    const { error, value } = editCourseValidate.validate(courseRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const { _id, name, desc, image, content, courseCategory } = value;

    if (image) {
      imageError = image.error;
      imageElement = image.element;
    }

    if (imageError) return { code: 2, msg: 'Upload lỗi', body: imageError };

    let slug = convertToSlug(name);

    console.log('_id', _id);

    let [courseFindById, courseFindByName, courseFindBySlug] = await Promise.all([
      Course.findById(_id).exec(),
      Course.findOne({ name }).exec(),
      Course.findOne({ slug }).exec(),
    ]);

    if (!courseFindById) return { code: 2, msg: 'Không tìm thấy id khóa học !' };

    if (courseFindByName) return { code: 3, msg: 'Tên danh mục đã tồn tại !' };

    if (courseFindBySlug) slug = slug + '-' + generateShortId();

    if (image) {
      const imageCloud = await uploadCloudinary(imageElement.path);
      courseFindById.imageId = imageCloud.imageId;
      courseFindById.imageUrl = imageCloud.imageUrl;
    }

    console.log('courseFindById', courseFindById);

    courseFindById.name = name;
    courseFindById.slug = slug;
    courseFindById.desc = desc;
    courseFindById.content = content;
    courseFindById.courseCategory = courseCategory;

    const updatedCourse = await courseFindById.save();

    return {
      code: 0,
      body: {
        imageId: updatedCourse.imageId,
        imageUrl: updatedCourse.imageUrl,
      },
      msg: 'Cập nhập khóa học thành công !',
    };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};
export const deleteCourse = async (courseRequest) => {
  try {
    const { error, value } = deleteCourseValidate.validate(courseRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    console.log('value', value);

    const courseFindById = await Course.findById(value.id);

    if (!courseFindById || courseFindById.deleted === true) {
      return { code: 2, msg: 'Không tìm thấy id khóa học !' };
    }

    courseFindById.deleted = true;
    await courseFindById.save();

    return { code: 0, msg: 'Xóa khóa học thành công !' };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};
