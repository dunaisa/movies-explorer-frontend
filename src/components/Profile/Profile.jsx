import React from 'react';
import './Profile.css';
import EditProfileForm from '../EditProfileForm/EditProfileForm';


const Profile = ({ onEdit, signOut, isError, errorMessage }) => {

  return (

    <EditProfileForm onEdit={onEdit} signOut={signOut} isError={isError} errorMessage={errorMessage} />

  );
}

export default Profile;
