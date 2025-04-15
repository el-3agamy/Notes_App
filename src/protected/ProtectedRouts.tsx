import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouts = () => {
  let userToken = localStorage.getItem("token")
  return (
    <>
      <div>
          {
            userToken == null && <Navigate to="" />
          }
      </div>
    </>
  )
}

export default ProtectedRouts