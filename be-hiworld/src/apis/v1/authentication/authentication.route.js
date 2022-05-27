// import router from './authentication.OAuth'
import { signUp, login, logout, forgotPassword, changePassword, refreshToken } from './authentication.controller';
import { Router } from 'express';
const router = Router();
router.post('/sign-up', async (req, res) => {
  const data = await signUp(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post('/login', async (req, res) => {
  const data = await login(req, res);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post('/logout', (req, res) => {
  const data = logout(res);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post('/forgot-password', async (req, res) => {
  const data = await forgotPassword(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post('/change-password', async (req, res) => {
  const data = await changePassword(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post('/refresh-token', async (req, res) => {
  const data = await refreshToken(req.body);
  return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

export default router;
