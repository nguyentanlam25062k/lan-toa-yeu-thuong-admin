import { Router } from 'express';
import { createCourse, getCourse, editCourse, deleteCourse } from './course.controller.js';
import { uploadSingleImage } from '../../../middlewares';

const router = Router();

router.get('/get-course', async (req, res) => {
  const data = await getCourse(req.query);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post('/create-course', uploadSingleImage, async (req, res) => {
  const data = await createCourse(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.patch('/edit-course', uploadSingleImage, async (req, res) => {
  const data = await editCourse(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.delete('/delete-course', async (req, res) => {
  const data = await deleteCourse(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

export default router;
