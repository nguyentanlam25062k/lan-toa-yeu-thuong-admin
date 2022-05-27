import { paramCase } from 'change-case';
import { useState, useEffect, forwardRef, useRef } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Slide,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import CourseCreate from './CourseCreate';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import { CourseTableRow, CourseTableToolbar } from '../../sections/@dashboard/course/list';
// utils
import { queryString } from '../../utils/queryString';
// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseAtom } from 'src/recoil/atoms/courseAtom';
import { courseCategoryAtom } from 'src/recoil/atoms/courseCategoryAtom';
import { courseQuerySelector } from 'src/recoil/selectors/courseSelector';
import { DialogAnimate } from 'src/components/animate';
import { deleteCourseApi, getCourseApi } from 'src/apis/courseApi';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'courseCategory', label: 'Course Category', align: 'left' },
  { id: 'createdAt', label: 'Created at', align: 'left' },
  { id: 'publish', label: 'Status', align: 'center', width: 180 },
  { id: 'createUid', label: 'Created by', align: 'right' },
  { id: '' },
  { id: 'a' },
];

// ----------------------------------------------------------------------

export default function CourseList() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [courseState, setCourseState] = useRecoilState(courseAtom);
  const [categoryState, setCategoryState] = useRecoilState(courseCategoryAtom);

  const {
    isEdit,
    course: currentCourse,
    courses,
    count,
    search,
    orderBy,
    order,
    page,
    limit: rowsPerPage,
    courseCategory: filterCategory,
    dense,
    isLoading,
    open,
  } = courseState;

  const { categories: optionsCategory } = categoryState;

  const query = queryString({ page, order, orderBy, search, limit: rowsPerPage, courseCategory: filterCategory });

  useEffect(() => {
    getCourse();
  }, [query]);

  const getCourse = async () => {
    const res = await getCourseApi(query);
    if (res.code === 0) {
      setCourseState({
        ...courseState,
        courses: res.body.course,
        count: res.body.count,
      });
    }
  };

  const handleOpenModal = () => {
    setCourseState({
      ...courseState,
      open: true,
    });
  };

  const handleCloseModal = () => {
    setCourseState({
      ...courseState,
      open: false,
    });
  };
  const handleSearchName = (event) => {
    setCourseState({
      ...courseState,
      search: event.target.value,
    });
  };

  const handleFilterCategory = (event) => {
    console.log('value', event.target.value);
    setCourseState({
      ...courseState,
      courseCategory: event.target.value,
    });
    // setFilterName(filterName);
    // setPage(0);
  };

  const handleDeleteRow = async (id) => {
    try {
      const { code, msg } = await deleteCourseApi(id);
      if (code === 0) {
        enqueueSnackbar(msg);
        setCourseState({
          ...courseState,
          courses: courses.filter((course) => course._id !== id),
        });
      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const handleEditRow = (row) => {
    setCourseState({
      ...courseState,
      open: true,
      isEdit: true,
      course: row,
    });
  };

  const handleCreateCourse = () => {
    setCourseState({
      ...courseState,
      open: true,
      isEdit: false,
    });
  };

  const handleChangePage = (event, newPage) => {
    setCourseState({
      ...courseState,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setCourseState({
      ...courseState,
      limit: parseInt(event.target.value, 10),
    });
  };

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setCourseState({
        ...courseState,
        orderBy: id,
        order: isAsc ? 'desc' : 'asc',
      });
    }
  };

  const handleChangeDense = (event) => {
    setCourseState({
      ...courseState,
      dense: event.target.checked,
    });
  };

  const denseHeight = dense ? 60 : 80;

  const isNotFound = courses?.length === 0 ? true : false;

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <DialogAnimate open={open} maxWidth="lg" sx={{ py: 4 }} onClose={handleCloseModal}>
          <CourseCreate isEdit={isEdit} currentCourse={currentCourse} />
        </DialogAnimate>
        <Button
          variant="contained"
          onClick={() => {
            console.log('courseState', courseState);
          }}
        >
          Check state
        </Button>
        <HeaderBreadcrumbs
          heading="Course List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Course',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateCourse}>
              New Course
            </Button>
          }
        />

        <Card>
          <CourseTableToolbar
            search={search}
            filterCategory={filterCategory}
            onSearchName={handleSearchName}
            onFilterCategory={handleFilterCategory}
            optionsCategory={optionsCategory}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={courses?.length}
                  onSort={handleSort}
                />

                <TableBody>
                  {courses?.map((row, index) => (
                    <CourseTableRow
                      key={row._id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                      onEditRow={() => handleEditRow(row)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, courses?.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={50}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
