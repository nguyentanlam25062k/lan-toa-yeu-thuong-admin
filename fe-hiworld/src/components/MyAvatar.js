// hooks
import createAvatar from 'src/utils/createAvatar';
import useAuth from '../hooks/useAuth';
// utils
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.profilePicture}
      alt={user?.username}
      color={user?.profilePicture ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
