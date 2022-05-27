const { atom } = require('recoil');

export const courseCategoryAtom = atom({
  key: 'courseCategoryAtom',
  default: {
    isLoading: false,
    msg: null,
    categories: [],
  },
});
