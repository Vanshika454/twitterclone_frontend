import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Coookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faHome, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';
export default function Sidebar() {

  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div
      style={{ width: '15vw', height: '100vh' }}
      className='border-end d-flex flex-column p-4'
    >
      <div>
        <FontAwesomeIcon 
          color="#1DA1F2"
          style={{ height: '2rem' }}
          className='py-1 px-3'
          icon={faComments}
        />
      </div>

      <SidebarOption 
        icon={faHome}
        name='Home'
        onClick={() => navigate('/')}
      />
      <SidebarOption 
        icon={faUser}
        name='Profile'
        onClick={() => navigate(`/profile/${user._id}`)}
      />
      <SidebarOption 
        icon={faRightFromBracket}
        name='Logout'
        onClick={() => {
          Coookies.remove('jwt');
          Coookies.remove('userId');

          navigate('/login');
        }}
      />

      <div className='flex-fill' />

      <div className='d-flex flex-row align-items-center'>
        <div className='rounded-5 d-flex justify-content-center align-items-center' style={{backgroundColor: 'rgba(0,0,0,0.2)', width: '3rem', aspectRatio: 1}}>
          {
            user.profilePicture ? <img 
              src={user.profilePicture?.includes('blob')? user.profilePicture : process.env.REACT_APP_BACKEND + user.profilePicture}  
              alt="Profile" 
              className='rounded-circle'
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              /> : <FontAwesomeIcon 
              color="rgba(0,0,0, 0.5)"
              style={{ height: '60%' }}
              className='py-1 px-3 m-auto'
              icon={faUser}
            />
          }
        </div>

        <div className='p-2 flex-fill'>
          <p className='m-0 fw-semibold'>{user.name}</p>
          <p className='m-0 fs-6'>@{user.userName}</p>
        </div>
      </div>
    </div>
  )
}

function SidebarOption({ icon, name, onClick }) {
  return (
    <div className='d-flex align-items-center px-4 py-2 my-1 rounded-5 sidebar-option' onClick={onClick}>
      <FontAwesomeIcon 
        color="black"
        style={{ height: '1.2rem' }}
        icon={icon}
      />
      <p className='m-0 ms-2'>{name}</p>
    </div>
  )
}
