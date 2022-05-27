import axios from '../utils/axios';

export const getCourseCategoryByIdApi = (query = '') => {
  return axios.get(`/course-category/get-category?${query}`);
};

export const getCourseCategoryApi = (query) => {
  return axios.get(`/course-category/get-category?${query}`);
};

export const createCourseCategory = (data) => {
  return axios.post(`/course-category/create-category`, data);
};

export const updateCourseCategory = (data) => {
  return axios.patch(`/course-category/update-category`, data);
};

export const deleteCourseCategory = (id) => {
  return axios.delete(`/course-category/delete-category`, { data: { id: id } });
};
