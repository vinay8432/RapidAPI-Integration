import React, { useState } from 'react'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleRegister = (event) => {
        event.preventDefault() // DO not Reload the Screen on t
        console.log("Hello World")
    }
    
  return (
    // if the user is above the age of 18, then only show this form
    <form>
        <div>
          <input type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
          <input type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          <button onClick={handleRegister}>Submit</button>
        </div>
    </form>
  )
};

export default Register

// Conditional Rendering

// depening on the condition we are using conditional redering