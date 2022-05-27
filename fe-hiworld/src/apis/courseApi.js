import axios from '../utils/axios';

export const getCourseApi = (query = {}) => {
  return axios.get(`/course/get-course?${query}`);
};

export const createCourseApi = (data) => {
  return axios.post(`/course/create-course`, data);
};

export const editCourseApi = (data) => {
  return axios.patch(`/course/edit-course`, data);
};

export const deleteCourseApi = (id) => {
  return axios.delete(`/course/delete-course`, { data: { id: id } });
};
