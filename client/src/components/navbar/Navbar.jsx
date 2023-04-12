import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.scss'
import {AiOutlineLogout} from 'react-icons/ai'
import { giveCurrentUser } from '../../utils/currentUser'
import newRequest from '../../utils/newRequest'
const Navbar = () => {
  const currentUser = giveCurrentUser()
  const navigate = useNavigate()

  const Inputref = useRef()
  const handleLogout=async()=>{
    try {
      await newRequest.post('/auth/logout')
      localStorage.setItem('currentUser',null)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleFind=()=>{
    navigate(`?search=${Inputref.current.value}`)
    Inputref.current.value=""
  }
  return (
    <nav className='navbar'>
      <div className="container">
          <Link to="/" className='link logo'>
              ImageHaven
          </Link>
      
        <div className='search'>
          <input type="text" placeholder='Search your favourite wallpapers...' ref={Inputref} />
          <button onClick={handleFind}>Find</button>
        </div>

        {currentUser ?(<div className="profile">
          <Link to={`/profile/${currentUser._id}`} className='link'>
           <div className="user">
              <img src={currentUser.pp || '/img/noavatar.png'} alt="" />
              <span>{currentUser.username}</span>
            </div>
            </Link> 

            <Link to="/addImage">
            <button>Upload</button>
            </Link>
            <AiOutlineLogout fontSize="20px" color='red' fontWeight="600" cursor="pointer" onClick={handleLogout}/>
        </div>): (
          <div className='login-register'>
          <Link to="/register" className='link'>
          <button className='registerBtn'>
              Join
          </button>
          </Link>
          
          <Link to="/login" className='link'>
          <button className='loginBtn'>
              Login
          </button>
          </Link>

          </div>
        ) }
      </div>
    </nav>
  )
}

export default Navbar