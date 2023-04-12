import React, { useReducer, useState } from 'react'
import './register.scss'
import { INITIAL_STATE, registerReducer } from '../../reducers/registerReducer'
import upload from '../../utils/upload'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
const Register = () => {

  const [files, setfiles] = useState(undefined)
  const navigate=useNavigate()
const [isSubmitting, setisSubmitting] = useState(false)

  const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);

  const handleInputChange=(e)=>{
    dispatch({type:"CHANGE_INPUT",payload:{name:e.target.name,value:e.target.value}})
  }


  const handleTagsChange=(e)=>{
    e.preventDefault()
    dispatch({type:"ADD_TAGS",payload:e.target[0].value})
    e.target[0].value=""
  }


  
  const handleSubmit=async(e)=>{
    e.preventDefault()
  setisSubmitting(true)
    const url = await upload(files)
    const res = await newRequest.post('/auth/register',{...state,pp:url})
    if (res.data) {
      setisSubmitting(false)
      navigate('/login')
    }else{
      console.log("error")
      setisSubmitting(false)
    }
  }

  return (
    <div className='register'>

      <div className='formGrp'>
        
        <div className="left">
         <div className='formItem'>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="" onChange={handleInputChange} />
         </div>

         <div className='formItem'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleInputChange}/>
         </div>

         <div className='formItem'>
            <label htmlFor="pass">Password</label>
            <input type="pass" name="password" onChange={handleInputChange} />
         </div>

        <div className='formItem'>
          <label htmlFor="pic">Your Profile Picture</label>
          <input type="file" name="pp" id="" onChange={(e)=>setfiles(e.target.files[0])}/>
        </div>  

        </div>

        <div className="right">
          <div className="formItem">
            <label htmlFor="desc">Write About Yourself</label>
            <textarea name="desc" id="" cols="30" rows="10" onChange={handleInputChange}></textarea>
          </div>
          <form className="formItem" onSubmit={handleTagsChange}>
            <label htmlFor="tags">Tags for yourself</label>
            <input type="text" name='tags'/>
            <button type='submit' >Add Tags</button>
            <div className="tags">
            {state.tags.map((tag,idx)=>(
              <span key={idx} className='tag'>{tag}</span>
              ))}
              </div>
          </form>
          <div className='formItem'>
            <label htmlFor="address">Your Address</label>
            <input type="text" name="address" id="" onChange={handleInputChange} />
          </div>
        <button type='submit'  onClick={handleSubmit} className={`${isSubmitting?'submitting':''}`}>{isSubmitting?"Registering":"Register"}</button>
        </div>
      </div>
    </div>
  )
}

export default Register