import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from './Modal'

import editProfile from '../services/user/editProfile';
import useAuth from '../hooks/useAuth';

export default function EditProfile({ onClose, onSuccess }) {

  const { user } = useAuth();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name.trim().length === 0 || location.trim().length === 0 || !dob) {
      setError('All fields are required!');
      return;
    }

    try {
      await editProfile(user._id, name, location, dob);

      toast.success('Profile Updated Successfully!');
      onSuccess && onSuccess({ name, location, dob });
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
        <input 
          className="form-control mb-4"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input 
          className="form-control mb-4"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
          
        <input 
          className="form-control mb-4"
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        {
          error && <p className='text-danger px-3'>{error}</p>
        }
        <div className='d-flex justify-content-end align-items-center border-top p-2 gap-3'>
          <button type="button" onClick={() => onClose && onClose()} className="btn btn-secondary">Cancel</button>
          <button type='submit' className='btn btn-primary'>Edit</button>
        </div>
      </form>
    </Modal>
  )
}
