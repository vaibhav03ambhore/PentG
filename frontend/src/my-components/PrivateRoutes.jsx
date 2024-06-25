import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

const PrivateRoutes = () => {
    const {userInfo}=useSelector((state)=> state.auth);

  return (
    <div>
        {userInfo ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default PrivateRoutes