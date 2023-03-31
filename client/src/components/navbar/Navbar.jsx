import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'
import { getCurrentUser } from '../../constants/user'
const Navbar = () => {
  const currentUser = getCurrentUser()
  const Inputref = useRef()
  
  return (
    <nav className='navbar'>
      <div className="container">

       
          <Link className='link logo'>
              ImageHaven
          </Link>
      
        <div className='search'>
          <input type="text" placeholder='Search your favourite wallpapers...' ref={Inputref} />
          <button>Find</button>
        </div>

        {currentUser ?(<div className="profile">
          <Link to={`/profile/${currentUser.id}`} className='link'>
           <div className="user">
              <img src={currentUser.pp} alt="" />
              <span>{currentUser.name}</span>
            </div>
            </Link> 

            <Link to="/addImage">
            <button>Upload</button>
            </Link>
        </div>): (
          <Link to="/register" className='link'>
          <button className='registerBtn'>
              Join
          </button>
          </Link>
        ) }
      </div>
    </nav>
  )
}

export default Navbar