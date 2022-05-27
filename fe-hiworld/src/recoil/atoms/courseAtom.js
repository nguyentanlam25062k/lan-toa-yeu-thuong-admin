const { atom } = require('recoil');

export const courseAtom = atom({
  key: 'courseAtom',
  default: {
    isLoading: false,
    msg: null,
    open: false,
    isEdit: false,
    //
    course: {
      name: '',
      desc: '',
      content: '',
      image: '',
      imageUrl: '',
      publish: true,
      courseCategory: null,
    },
    //
    courses: [],
    count: 0,
    limit: 5,
    page: 0,
    orderBy: '-createdAt',
    order: 'asc',
    search: '',
    courseCategory: 'all',
    //
    dense: false,
  },
});
