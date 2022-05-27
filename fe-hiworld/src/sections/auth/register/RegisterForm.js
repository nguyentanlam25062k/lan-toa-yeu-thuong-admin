import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
import useResponsive from 'src/hooks/useResponsive';
import { register } from 'src/apis/authApi';
import { useRecoilState } from 'recoil';
import { authAtom } from 'src/recoil/atoms/authAtom';
import { useSnackbar } from 'notistack';
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [gender, setGender] = useState('Male');
  const [authState, setAuthState] = useRecoilState(authAtom);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const smDown = useResponsive('down', 'sm');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        ' Password must have 8 characters, at least 1 letter or 1 number'
      ),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    firstName: 'Quang',
    lastName: 'Nguyen',
    email: 'quang.nv212@gmail.com',
    password: 'nguyenquang123',
    confirmPassword: 'nguyenquang123',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async ({ email, firstName, lastName, password }) => {
    try {
      const registerResponse = await register({ email, password, firstName, lastName, gender: gender.toLowerCase() });
      if (registerResponse.code === 0) {
        setAuthState({
          ...authState,
          loginRedirect: true,
        });
        navigate(PATH_AUTH.login, { replace: true });
        enqueueSnackbar(registerResponse.msg, { variant: 'success' });
        reset();
      } else {
        enqueueSnackbar(registerResponse.msg, { variant: 'error' });
      }
    } catch (err) {
      console.error(err?.message || 'Đăng ký lỗi do server');
      enqueueSnackbar('Đăng ký lỗi do server', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ alignItems: smDown ? 'flex-start' : 'center' }}
          spacing={{ xs: 1, sm: 10 }}
        >
          <FormLabel>Gender</FormLabel>
          <RHFRadioGroup
            name="gender"
            options={['Male', 'Female']}
            onChange={(e) => setGender(e.target.value)}
            defaultValue="Male"
            sx={{
              flexDirection: smDown ? 'column' : 'row',
              ml: smDown ? '20px' : '0',
            }}
          />
        </Stack>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
