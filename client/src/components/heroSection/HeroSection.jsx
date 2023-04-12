import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './heroSection.scss'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub} from 'react-icons/bs'

import {RxSewingPinFilled} from 'react-icons/rx'
import { giveCurrentUser } from '../../utils/currentUser'
import newRequest from '../../utils/newRequest'
const HeroSection = ({user,isLoading,isError,refetch}) => {
  const currentUser = giveCurrentUser()
  const [hasFollowed, sethasFollowed] = useState(false)
  const [startedFollowing, setstartedFollowing] = useState(false)
  
  useEffect(() => {
    if (user?.followers?.includes(currentUser._id)) {
      sethasFollowed(true)
    }else{
      sethasFollowed(false)
    }
  }, [currentUser._id,user?.followers])
  
  
  const socials=[
        {
          name:"Facebook",
          icon:<BsFacebook/>,
          url:"facebook.com"
        },
        {
          name:"Instagram",
          icon:<BsInstagram/>,
          url:"instagram.com"
        },
        {
          name:"Twitter",
          icon:<BsTwitter/>,
          url:"instagram.com"
        },
        {
          name:"Github",
          icon:<BsGithub/>,
          url:"github.com"
        }
      ]  
      const handleFollow=async()=>{
          setstartedFollowing(true)
          const res = await newRequest.put(`/user/follow/${user._id}`)
          if (res?.data?.hasFollowed) {
            setstartedFollowing(false)
            sethasFollowed(true)
            refetch()
            
          }else{
            console.log(res?.data?.hasFollowed)
            refetch()
            sethasFollowed(false)
          }
      }
      // console.log(hasFollowed)
  return (  
    <div className='hero'>
      {isLoading?"Loading...":isError?"Please try again":<><img src={user?.pp || '/img/noavatar.png'} alt={user?.username} />
      <div className="aboutUser">
        <span className='username'>{user?.username}</span>

        <div className="tags">
          {user?.tags?.map((tag,idx)=>(
            <span key={idx} className='tag'>
              {tag}
            </span>
          ))}
        </div>
       
        <div className="about">{user?.desc} <span>{user?.email}</span></div>
        <address> <RxSewingPinFilled/>{user?.address}</address>
        <div className="reach">
          {currentUser._id !== user._id ? <button className='follow' disabled={startedFollowing} onClick={handleFollow}>{hasFollowed?"Following":"Follow"}</button>:<></> }
          <span>{user?.followers?.length}  {user?.followers?.length ===1 ?"Follower":"Followers"}</span>
          <span> {user?.following?.length} Following</span>
        </div>
      </div>
      <div className="socials">
          {socials.map((social,idx)=>(
            <Link to={social.url} className='link' key={idx}>
            <span className='social'>{social.icon}</span>
            </Link>
          ))}
        </div>
        </>}
    </div>
  )
}

export default HeroSection