import React, { useRef,useState,useEffect } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
const Login = () => {
  const nameRef = useRef()
  const navigate=useNavigate()
  const passRef = useRef()
  const [loggingIn, setloggingIn] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let interval;
    if (error) {
      interval = setTimeout(() => {
        setError("")
      }, 3000);
    }
   return ()=>clearInterval(interval)
  }, [error])
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setloggingIn(true)
    if (passRef.current.value.trim().length<=0 || nameRef.current.value.trim().length<=0) {
      setloggingIn(false)
      setError("Credentials are required")
      return
    }

    try {
      const res = await newRequest.post('/auth/login',{username:nameRef.current.value,password:passRef.current.value})
      localStorage.setItem("currentUser",JSON.stringify(res.data))
      setloggingIn(false)
      navigate('/')
    } catch (error) {
      setError(error.response.data)
      setloggingIn(false)
    }
  

  }

  return (
   <div className='login'>
      <div className="container">
          <form action=""  onSubmit={handleSubmit}>
            <div className="formItem">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="" ref={nameRef} />
            </div>
            <div className="formItem">
            <label htmlFor="password">Password</label>
              <input type="password" name="pass" id="pass" ref={passRef} />
            </div>
            <button className={`${loggingIn?'logging':''}`}>
              {loggingIn?"Logging You in...":'Login'}
            </button>
          <span>
            Don't have an account?<Link to="/register" className='link' style={{color:"#9370DB",fontWeight:"600"}}>Register Now</Link>
          </span>
          {error && <h3 className='error'>{error}!</h3> }
          </form>
      </div>
   </div>
  )
}

export default Login