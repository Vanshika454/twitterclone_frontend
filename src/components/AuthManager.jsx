import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import useAuth from '../hooks/useAuth';
import { USER_STATE } from '../contexts/AuthContext';

import getUserData from '../services/user/getUserData';

export default function AuthManager({ children }) {
  const { setUser } = useAuth();
  const authCookie = Cookies.get('jwt');
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (!authCookie || !userId) {
      setUser({
        state: USER_STATE.FAILED,
      });
      return;
    }

    // Create an asynchronous function inside useEffect
    const fetchUserData = async () => {
      try {
        const data = await getUserData(userId);
        setUser({
          state: USER_STATE.SUCCESS,
          ...data
        });
      } catch (error) {
        console.error('Error fetching user data:', error); // Log the error
        setUser({
          state: USER_STATE.FAILED,
        });
      }
    };

    fetchUserData(); // Call the async function

  }, [authCookie, userId, setUser]);

  return (
    <>
      {children}
    </>
  );
}
