import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

import useAuth from '../hooks/useAuth'
import { USER_STATE } from '../contexts/AuthContext';

import getUserData from '../services/user/getUserData';

export default function AuthManager({ children }) {

  const { setUser } = useAuth();
  const authCookie = Cookies.get('jwt');
  const userId = Cookies.get('userId');

  useEffect(() => {
    if(!authCookie || !userId) {
      setUser({
        state: USER_STATE.FAILED,
      });
    } else {
      (async () => {
        try {
          const data = await getUserData(userId);

          setUser({
            state: USER_STATE.SUCCESS,
            ...data
          })
        } catch (error) {
          setUser({
            state: USER_STATE.FAILED,
          });
        }
      })();
    }
  }, [authCookie, userId, setUser]);

  return (
    <>
      {children}
    </>
  )
}
