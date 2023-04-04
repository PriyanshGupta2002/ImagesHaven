import React from 'react'
import './register.scss'
const Register = () => {
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("submitted")
  }
  return (
    <div className='register'>

      <div className='formGrp'>
        
        <div className="left">
         <div className='formItem'>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="" />
         </div>

         <div className='formItem'>
            <label htmlFor="email">Email</label>
            <input type="email" name="username" />
         </div>

         <div className='formItem'>
            <label htmlFor="pass">Password</label>
            <input type="pass" name="pass" />
         </div>

        <div className='formItem'>
          <label htmlFor="pic">Your Profile Picture</label>
          <input type="file" name="pic" id="" />
          <button>Upload</button>
        </div>  

        </div>

        <div className="right">
          <div className="formItem">
            <label htmlFor="desc">Write About Yourself</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div className="formItem">
            <label htmlFor="tags">Tags for yourself</label>
            <input type="text" name='tags' />
            <button>Add Tags</button>
          </div>
          <div className='formItem'>
            <label htmlFor="address">Your Address</label>
            <input type="text" name="address" id="" />
          </div>
        <button type='submit' onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register