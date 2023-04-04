import React from 'react'
import './login.scss'
const Login = () => {
  return (
   <div className='login'>
      <div className="container">
          <form action="">
            <div className="formItem">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="" />
            </div>
            <div className="formItem">
            <label htmlFor="username">Password</label>
              <input type="text" name="pass" id="" />
            </div>
            <button>
              Login
            </button>
          </form>
      </div>
   </div>
  )
}

export default Login