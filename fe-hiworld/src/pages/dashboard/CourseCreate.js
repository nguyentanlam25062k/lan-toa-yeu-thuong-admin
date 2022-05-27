import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//
import CourseNewEditForm from 'src/sections/@dashboard/course/CourseNewEditForm';
import { useRecoilValue } from 'recoil';
import { courseAtom } from 'src/recoil/atoms/courseAtom';

// ----------------------------------------------------------------------

export default function CourseCreate({ isEdit, currentCourse }) {
  const { themeStretch } = useSettings();

  return (
    <Page title="Course: Create a new course">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new course' : 'Edit course'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Course',
              href: PATH_DASHBOARD.course.root,
            },
            { name: !isEdit ? 'New course' : currentCourse?.name },
          ]}
        />

        <CourseNewEditForm isEdit={isEdit} currentCourse={currentCourse} />
      </Container>
    </Page>
  );
}
