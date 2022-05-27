import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Iconify from 'src/components/Iconify';
import { PATH_AUTH } from 'src/routes/paths';
import { login } from 'src/apis/authApi';
import { authAtom } from 'src/recoil/atoms/authAtom';
import { useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
// routes

// ----------------------------------------------------------------------
const FBButton = styled(Button)(() => ({
  backgroundColor: '#4267B2',
  color: '#fff',
  marginRight: '0.8rem',
  '&:hover': {
    backgroundColor: '#4267B2',
    opacity: 0.8,
  },
}));
const GGButton = styled(Button)(() => ({
  backgroundColor: '#e74032',
  color: '#fff',
  marginLeft: '0.8rem',
  '&:hover': {
    backgroundColor: '#e74032',
    opacity: 0.8,
  },
}));

export default function LoginForm() {
  const [authState, setAuthState] = useRecoilState(authAtom);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'quang.nv212@gmail.com',
    password: 'nguyenquang123',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }) => {
    try {
      const loginResponse = await login({ email, password });
      console.log(loginResponse);
      if (loginResponse.code === 0) {
        setAuthState({
          ...authState,
          isAuthenticated: true,
          user: loginResponse.body.restUser,
        });
        enqueueSnackbar(loginResponse.msg, { variant: 'success' });
      } else {
        enqueueSnackbar(loginResponse.msg, { variant: 'error' });
      }
    } catch (err) {
      console.error(err?.message || 'Đăng nhập do lỗi từ server');
      enqueueSnackbar('Đăng nhập do lỗi từ server', { variant: 'error' });
    }
  };
  const handleGoogleLogin = () => {
    window.open(`${process.env.REACT_APP_HOST_API_KEY}/authentication/google`, '_self');
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
      <Typography sx={{ m: 1 }} variant="span" component="h3" align="center">
        or
      </Typography>
      <Stack direction="row">
        <FBButton
          startIcon={<FacebookIcon style={{ fontSize: '2rem' }} />}
          fullWidth
          size="large"
          type="button"
          variant="contained"
        >
          Facebook
        </FBButton>
        <GGButton
          startIcon={<GoogleIcon style={{ fontSize: '1.8rem' }} />}
          onClick={handleGoogleLogin}
          fullWidth
          size="large"
          type="button"
          variant="contained"
        >
          Google
        </GGButton>
      </Stack>
    </FormProvider>
  );
}
