import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'src/recoil/atoms/authAtom';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};
export default function GuestGuard({ children }) {
  const { isAuthenticated } = useRecoilValue(authAtom);

  if (isAuthenticated) {
    
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
