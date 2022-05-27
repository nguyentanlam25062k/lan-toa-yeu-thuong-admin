import { useEffect } from 'react';
// recoil
import { useRecoilState } from 'recoil';
import { courseAtom } from './recoil/atoms/courseAtom';
import { courseCategoryAtom } from './recoil/atoms/courseCategoryAtom';
// apis
import { getCourseCategoryApi } from './apis/courseCategoryApi';
import { useSnackbar } from 'notistack';

export default function GlobalState({ children }) {
  const [categoryState, setCategoryState] = useRecoilState(courseCategoryAtom);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getCourseCategory = async () => {
      try {
        const res = await getCourseCategoryApi();
        if (res.code === 0) {
          setCategoryState({
            ...categoryState,
            categories: [...res.body.category, { _id: 'all', name: 'all' }],
            count: res.body.count,
          });
        } else {
          enqueueSnackbar(res.msg);
        }
      } catch (e) {
        enqueueSnackbar(e.message);
      }
    };
    getCourseCategory();
  }, []);

  return children;
}
