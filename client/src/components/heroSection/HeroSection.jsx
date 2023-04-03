import React from 'react'
import { Link } from 'react-router-dom'
import './heroSection.scss'
import {RxSewingPinFilled} from 'react-icons/rx'
const HeroSection = ({user}) => {

  return (  
    <div className='hero'>
      <img src={user.pp} alt="" />
      <div className="aboutUser">
        <span className='username'>{user.name}</span>
        <div className="tags">
          {user.tags.map((tag,idx)=>(
            <span key={idx} className='tag'>
              {tag}
            </span>
          ))}
        </div>
       
        <div className="about">{user.about}</div>
        <address> <RxSewingPinFilled/>{user.address}</address>
      </div>
      <div className="socials">
          {user.socials.map((social)=>(
            <Link to={social.url} className='link'>
            <span className='social'>{social.icon}</span>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default HeroSection