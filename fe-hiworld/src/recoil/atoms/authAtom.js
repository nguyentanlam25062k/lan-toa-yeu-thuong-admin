import persistAtom from 'src/recoil/recoilPersist';
const { atom } = require('recoil');
export const authAtom = atom({
  key: 'authAtom',
  default: {
    isAuthenticated: false,
    user: {},
  },
  effects_UNSTABLE: [persistAtom],
});
