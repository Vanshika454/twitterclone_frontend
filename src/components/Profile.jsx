import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCakeCandles, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import EditProfile from './EditProfile'
import EditProfilePicture from './EditProfilePicture'

import useAuth from '../hooks/useAuth';
import followUser from '../services/user/followUser';
import unfollowUser from '../services/user/unfollowUser';

export default function Profile({ user }) {

  const { user: loggedInUser, setUser: setLoggedInUser } = useAuth();

  const [isFollowing, setIsFollowing] = useState(loggedInUser?.following?.some(userId => userId === user._id));
  const [followers, setFollowers] = useState(user?.followers?.length);
  const [loggedInUserProfilePic, setLoggedInUserProfilePic] = useState(loggedInUser?.profilePicture? (loggedInUser?.profilePicture?.includes('blob')? loggedInUser?.profilePicture : process.env.REACT_APP_BACKEND + loggedInUser?.profilePicture) : null);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);

  useEffect(() => {
    setIsFollowing(loggedInUser?.following?.some(userId => userId === user._id));
    setFollowers(user?.followers?.length);
    setLoggedInUserProfilePic(loggedInUser?.profilePicture? (loggedInUser?.profilePicture?.includes('blob')? loggedInUser?.profilePicture : process.env.REACT_APP_BACKEND + loggedInUser?.profilePicture) : null);
  }, [loggedInUser, user])

  const handleFollow = async () => {
    try {
      await followUser(user._id);

      toast.success('User followed successfully!');
      setIsFollowing(true);
      setFollowers(followers + 1);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollowUser(user._id);

      toast.success('User unfollowed successfully!');
      setIsFollowing(false);
      setFollowers(followers - 1);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleOnEditSuccess = ({ name, location, dob }) => {
    setLoggedInUser({
      ...loggedInUser,
      name,
      location,
      dob
    })
  }

  const handleSuccessUploadProfilePic = (profilePicture) => {
    setLoggedInUser({
      ...loggedInUser,
      profilePicture
    })
  }

  return (
    <>
      {isEditing && <EditProfile onClose={() => setIsEditing(false)} onSuccess={handleOnEditSuccess} />}
      {isEditingProfilePicture && <EditProfilePicture onClose={() => setIsEditingProfilePicture(false)} onSuccess={handleSuccessUploadProfilePic} />}
      <div className='m-4 mb-0'>
        <p className='fs-5 fw-semibold mb-2'>Profile</p>

        <div className='' style={{ height: '12rem', backgroundColor: '#1DA1F2'  }} />
        <div className='position-relative d-flex justify-content-end align-items-start' style={{ height: '5rem' }}>
        {
          user._id === loggedInUser._id ?
          (loggedInUserProfilePic ? <img 
            src={loggedInUserProfilePic} 
            alt="profile"
            className='position-absolute rounded-pill'
            style={{
              top: '-5rem',
              left: '1rem',
              height: '10rem',
              width: '10rem',
              objectFit: 'cover'
            }}
          /> : <div
            className='position-absolute rounded-pill d-flex justify-content-center align-items-center'
            style={{
              top: '-5rem',
              left: '1rem',
              height: '10rem',
              width: '10rem',
              backgroundColor: 'gray',
            }}
          >
            <p className='m-0 text-white fw-semibold fs-5'>No Image</p>
          </div>) :
          (user.profilePicture ? <img 
            src={process.env.REACT_APP_BACKEND + user.profilePicture} 
            alt="messi"
            className='position-absolute rounded-pill'
            style={{
              top: '-5rem',
              left: '1rem',
              height: '10rem',
              width: '10rem',
              objectFit: 'cover'
            }}
          /> : <div
            className='position-absolute rounded-pill d-flex justify-content-center align-items-center'
            style={{
              top: '-5rem',
              left: '1rem',
              height: '10rem',
              width: '10rem',
              backgroundColor: 'gray',
            }}
          >
            <p className='m-0 text-white fw-semibold fs-5'>No Image</p>
          </div>)
        }

          {
            user._id === loggedInUser._id ? <div className='m-2 d-flex gap-2'>
              <button type="button"  onClick={() => setIsEditingProfilePicture(true)} className="btn btn-outline-primary px-4">Upload profile picture</button>
              <button type="button" onClick={() => setIsEditing(true)} className="btn btn-dark px-4">Edit</button>
            </div> : <div className='m-2 d-flex gap-2'>
              <button 
                type="button" 
                className="btn btn-dark px-4"
                onClick={isFollowing? handleUnfollow : handleFollow}
              >
                {isFollowing? 'Unfollow' : 'Follow' }
              </button>
            </div>
          }
        </div>

        <p className='m-1 fw-semibold fs-5'>
          {
            user._id === loggedInUser._id ? 
              loggedInUser.name : 
              user.name
          }</p>
        <p className='m-0 fs-6'>@{user.userName}</p>

        <div className='d-flex mt-4'>
          <div className='d-flex align-items-center'>
            <FontAwesomeIcon
              color='black'
              style={{ height: '1rem' }}
              icon={faCakeCandles}
            />
            {
              user._id === loggedInUser._id ? 
              <p className='m-1 me-4'>Dob, {loggedInUser?.dob? new Date(loggedInUser?.dob).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }) : 'Not available'}</p> :
              <p className='m-1 me-4'>Dob, {user?.dob? new Date(user?.dob).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }) : 'Not available'}</p>
            }
          </div>

          <div className='d-flex align-items-center'>
            <FontAwesomeIcon
              color='black'
              style={{ height: '1rem' }}
              icon={faLocationDot}
            />
            <p className='m-1'>Location, {
              user._id === loggedInUser._id ? loggedInUser?.location || 'Not available' : user.location || 'Not available'
            }</p>
          </div>
        </div>
        <div className='d-flex align-items-center'>
          <FontAwesomeIcon
            color='black'
            style={{ height: '1rem' }}
            icon={faCalendarDays}
          />
          <p className='m-1'>Joined, {
            user._id === loggedInUser._id ? 
            new Date(loggedInUser?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }) :
            new Date(user?.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })
          }</p>
        </div>

        <div className='d-flex mt-4'>
          <p className='m-1'>{
            user._id === loggedInUser._id ?
            loggedInUser?.following?.length :
            user?.following?.length
          } Following</p>
          <p className='m-1'>{
            user._id === loggedInUser._id ?
            loggedInUser?.followers?.length :
            followers
          } Followers</p>
        </div>
      </div>
    </>
  )
}
