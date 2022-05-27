import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, InputAdornment, Button, Autocomplete } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseAtom } from 'src/recoil/atoms/courseAtom';
import { courseCategoryAtom } from 'src/recoil/atoms/courseCategoryAtom';
import { createCourseApi, editCourseApi } from 'src/apis/courseApi';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

CourseNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCourse: PropTypes.object,
};

export default function CourseNewEditForm({ isEdit, currentCourse }) {
  const [courseState, setCourseState] = useRecoilState(courseAtom);
  const [categoryState, setCategoryState] = useRecoilState(courseCategoryAtom);

  const { course, courses } = courseState;
  const { categories: optionsCategory } = categoryState;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewCourseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    desc: Yup.string().required('Desc is required'),
    content: Yup.string().required('Content is required'),
    // image: Yup.array().min(1, 'Images is required'),
  });

  const defaultValues = {
    _id: currentCourse?._id,
    name: currentCourse?.name || '',
    desc: currentCourse?.desc || '',
    content: currentCourse?.content || '',
    image: currentCourse?.imageUrl || '',
    publish: currentCourse?.publish || true,
    courseCategory: currentCourse?.courseCategory?._id || optionsCategory[0]._id,
  };

  if (isEdit) {
    defaultValues._id = currentCourse?._id;
  } else {
    delete defaultValues._id;
  }

  const methods = useForm({ resolver: yupResolver(NewCourseSchema), defaultValues });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      if (isEdit) form.append('_id', course._id);
      if (typeof data.image !== 'string') form.append('image', data.image);

      form.append('name', data.name);
      form.append('desc', data.desc);
      form.append('content', data.content);
      form.append('publish', data.publish);
      form.append('courseCategory', data.courseCategory);

      const response = isEdit === true ? await editCourseApi(form) : await createCourseApi(form);

      enqueueSnackbar(response.msg);

      if (response.code === 0) {
        setCourseState({
          ...courseState,
          open: false,
          courses: courses.map((course) =>
            course._id === data._id ? { ...course, imageUrl: response.body.imageUrl } : course
          ),
        });
      }
    } catch (e) {
      enqueueSnackbar(e.message);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Button
                variant="contained"
                onClick={() => {
                  console.log('courseState', courseState);
                  console.log('categoryState', categoryState);
                }}
              >
                Check state
              </Button>

              <div>
                <RHFTextField name="name" label="Course Name" />
              </div>

              <div>
                <RHFTextField name="desc" label="Description" />
              </div>

              <div>
                <LabelStyle>Content</LabelStyle>
                <RHFEditor simple name="content" placeholder="Course Content here..." />
              </div>

              <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadSingleFile name="image" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <RHFSwitch name="publish" label="Publish" />

              <Stack spacing={3} mt={2}>
                <RHFSelect name="courseCategory" label="Course category">
                  {optionsCategory.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Course' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
