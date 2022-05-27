// import { selector } from 'recoil';
// import { courseAtom } from '../atoms/courseAtom';

// `/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}&where[category]=${category}`

// export const courseQuerySelector = selector({
//   key: 'courseQuerySelector',
//   get: async ({ get }) => {
//     let { limit, page, order, search } = get(courseAtom);

//     if (!limit) limit = 0;

//     if (!page) page = 0;

//     if (!sort) sort = '';

//     if (!search) search = '';

//     return `limit=${limit}&page=${page}&sort=${sort}&search=${search}`;
//   },
// });
