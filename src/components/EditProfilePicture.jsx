import React from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify'

import useAuth from '../hooks/useAuth';
import editProfilePicture from '../services/user/editProfilePicture';

export default function EditProfilePicture({ onClose, onSuccess }) {

  const { user } = useAuth();
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!image) {
      setError('Image is required!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profilePic', image);
      await editProfilePicture(user._id, formData);

      toast.success('Profile Picture Updated Successfully!');
      onSuccess && onSuccess(URL.createObjectURL(image));
      onClose && onClose();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Modal>
      <p className='border-bottom fw-bold fs-5 m-0 p-3' >Edit Profile</p>

      <form
        onSubmit={handleSubmit}
        className='p-3'
      >
        <div className="alert alert-primary" role="alert">
          <p className='m-0'>Note: Image should be square in size</p>
        </div>

        <input 
          className="form-control mb-3" 
          type="file" 
          id="formFile" 
          onChange={(e) => setImage(e.target.files[0])}
        />

        {
          image && <img 
            src={URL.createObjectURL(image)}
            alt="profile" 
            className='mb-3'
            style={{ width: '100%', height: 'auto' }}
          />
        }
        {
          error && <p className='text-danger px-3'>{error}</p>
        }
        <div className='d-flex justify-content-end align-items-center border-top p-2 gap-3'>
          <button type="button" onClick={() => onClose && onClose()} className="btn btn-secondary">Cancel</button>
          <button type='submit' className='btn btn-primary'>Upload</button>
        </div>
      </form>
    </Modal>
  )
}
