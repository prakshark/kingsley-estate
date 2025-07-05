import React from 'react'
import { useParams } from 'react-router-dom'

function UserProfile() {
    const {userId} = useParams();

  return (
    <div>
      User Profile Page for {userId}
    </div>
  )
}

export default UserProfile
