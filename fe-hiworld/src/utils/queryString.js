// qs
import qs from 'qs';

export const queryString = ({ order, orderBy, ...restQuery }) => {
  const query = {
    ...restQuery,
    sort: `${order === 'asc' ? '' : '-'}${orderBy}`,
  };
  return qs.stringify(query, { encode: false });
};
