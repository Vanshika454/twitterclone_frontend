import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';

import AuthContext, { AuthContextProvider } from "./contexts/AuthContext";
import AuthManager from "./components/AuthManager";
import { USER_STATE } from "./contexts/AuthContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogIn from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import Tweet from './pages/tweet';

import NotFound from './pages/not-found';

function App() {
  return (
    <>
      <AuthContextProvider>
      <AuthManager>
        <Router>
          <Routes>

            <Route exact path='/login' element={< LogIn />}/>
            <Route exact path='/register' element={< Register />}/>

            <Route element={<PersistantLogin />}>
              <Route exact path='/' element={< Home />}/>
              <Route exact path='/profile/:id' element={< Profile />}/>
              <Route exact path='/tweet/:id' element={< Tweet />}/>
            </Route>

            {/* Not found */}
            <Route path='*' element={ <Navigate to="/404" /> } />
            <Route path='/404' element={< NotFound />} />
          </Routes>
        </Router>

        </AuthManager>
      </AuthContextProvider>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
      />
    </>
  );
}

function PersistantLogin() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user.state === USER_STATE.FAILED) navigate('/login');
  }, [user.state, navigate])

  return <Outlet />;
}

export default App;
