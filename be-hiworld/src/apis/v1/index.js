import { Router } from 'express';
import userRouter from './user/user.route';
import authenticationRoute from './authentication/authentication.route';
import courseCategoryRouter from './course-category/course-category.route';
import courseRouter from './course/course.route';

const router = Router();

router.use('/user', userRouter);
router.use('/authentication', authenticationRoute);
router.use('/course-category', courseCategoryRouter);
router.use('/course', courseRouter);

export default router;
