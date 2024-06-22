/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!(localStorage.getItem("token") && localStorage.getItem("user"))) {

      navigate('/login')
    }
  }, [!localStorage.getItem("token"), !localStorage.getItem("user")])


  // if (!(localStorage.getItem("token") && localStorage.getItem("user"))) {
  //   // not logged in so redirect to login page with the return url
  //   return <Navigate to="/login" />
  // }

  // authorized so return child components
  return children;
}

export default ProtectedRouter