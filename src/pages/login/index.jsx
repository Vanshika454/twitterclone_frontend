import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';

import useAuth from '../../hooks/useAuth';
import { USER_STATE } from '../../contexts/AuthContext';
import login from '../../services/auth/login';

export default function Login() {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors

    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const response = await login(username, password);

      if (response.status === 200) {
        toast.success('Logged in successfully');
        setUser({ state: USER_STATE.SUCCESS, ...response.data.user });
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
        toast.error(response.data.message || 'Login failed');
      }
      
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="d-flex bg-white overflow-hidden rounded shadow" style={{ height: '50%', width: '60%' }}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#1DA1F2', width: '40%' }}>
          <p className="text-white fs-3">Welcome Back</p>
          <FontAwesomeIcon 
            color="white"
            style={{ height: '5rem' }}
            icon={faComments}
          />
        </div>

        <div className="d-flex flex-column justify-content-center w-60 p-4" style={{width: '60%'}}>
          <p className="fs-2 fw-bold">Log in</p>

          <form onSubmit={handleLogin}>
            <input 
              className="form-control mb-4"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input 
              className="form-control mb-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-danger m-0">{error}</p>}
            <button type="submit" className="btn btn-dark mb-4 px-4">Login</button>
          </form>

          <p className='fs-6'>Don't have an account? <a href="/register" className='fw-semibold m-lg-1' style={{ color: '#1DA1F2' }}>Register here</a></p>
        </div>
      </div>
    </div>
  );
}

