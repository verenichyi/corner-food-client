import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { authActions } from '../../redux/slices/auth';

const Profile = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <button onClick={() => dispatch(authActions.logout())}>Logout</button>
    </div>
  );
};

export default Profile;
