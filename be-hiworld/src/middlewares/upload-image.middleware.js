import _ from 'lodash';
import { uploadMulter } from '../utils';

const handleListImageMessageError = ({ errors, type, content, positionCurrentImage }) => {
  const existPosition = errors.some((error) => error.position === positionCurrentImage);
  if (existPosition) {
    const element = errors.find((error) => error.position === positionCurrentImage);
    element.detail.push({ type, content });
  } else {
    errors.push({
      position: positionCurrentImage,
      detail: [{ type, content }],
    });
  }
};

const getListImageError = (images) => {
  let result = [];
  for (let i = 0; i < images.length; i++) {
    if (!['image/jpeg', 'image/png'].includes(images[i].mimetype)) {
      handleListImageMessageError({
        errors: result,
        type: 'format',
        content: 'Đinh dạng file không hợp lệ !',
        positionCurrentImage: i,
      });
    }

    if (images[i].size > 1024 * 1024) {
      handleListImageMessageError({
        errors: result,
        type: 'size',
        content: 'Dung lượng file không được quá 1MB !',
        positionCurrentImage: i,
      });
    }
  }
  return errors.length > 0 ? errors : null;
};

const getImageError = (image) => {
  let errors = [];
  if (!['image/jpeg', 'image/png'].includes(image.mimetype)) {
    errors.push({ type: 'format', content: 'Đinh dạng file không hợp lệ !' });
  }

  if (image.size > 1024 * 1024) {
    errors.push({ type: 'size', content: 'Dung lượng file không được quá 1Mb !' });
  }
  return errors.length > 0 ? errors : null;
};

export const uploadListImage = (req, res, next) => {
  const upload = uploadMulter.array('images', '4');
  upload(req, res, (err) => {
    const images = {};
    if (err) {
      images.error = err.message;
    } else {
      const files = req.files;
      if (files) {
        const error = getListImageError(files);
        images.error = error;
        images.element = files;
      }
    }
    req.body.image = _.isEmpty(image) ? null : image;
    next();
  });
};

export const uploadSingleImage = (req, res, next) => {
  const upload = uploadMulter.single('image');
  upload(req, res, (err) => {
    const image = {};
    if (err) {
      image.error = err.message;
    } else {
      const file = req.file;
      if (file) {
        const error = getImageError(file);
        image.error = error;
        image.element = file;
      }
    }
    req.body.image = _.isEmpty(image) ? null : image;
    next();
  });
};
