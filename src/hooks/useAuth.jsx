import { useContext } from 'react'

import AuthContext from '../contexts/AuthContext'

export default function useAuth() {

  const { user, setUser } = useContext(AuthContext);

  return {
    user,
    setUser
  }
}
