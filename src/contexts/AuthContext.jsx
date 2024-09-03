import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({
    state: 'DEFAULT',
  });  
  return <AuthContext.Provider
    value={{user, setUser}}
  >
    {children}
  </AuthContext.Provider>
}

export const USER_STATE = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
}
export default AuthContext;