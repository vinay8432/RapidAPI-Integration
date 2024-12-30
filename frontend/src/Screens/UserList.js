import React from 'react'
import UserCard from '../Components/UserCard'
import data from "../utils/data"

const UserList = () => {
    
  return (
    <div>
        {data.map(({name, age, email})=>(
            <UserCard name={name} age={age} email={email}/>
        ))}
    </div>
  )
}

export default UserList