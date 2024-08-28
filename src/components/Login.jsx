import React, { useState } from 'react'
import style from '../css/Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
const GoogleAuth = ({ setUserData } ) => {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleSuccess = credentialResponse => {
    setLoading(true);
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    setUserData(decoded);
    // setLoggedIn(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 2000);
  };



  return (
    <div className='googleLogin-container'>
      <h2 className='social-login-title'>Sign In</h2>
      <GoogleLogin
         onSuccess={handleSuccess}
         onFailure={() => console.log('Login Failed')}
         cookiePolicy={"single_host_policy"}
     />
     {loading ? (
        <div className="loader"></div>
      ) : (
        loggedIn && <Navigate to='/form' />
      )}
    </div>
  )
}

export default GoogleAuth;