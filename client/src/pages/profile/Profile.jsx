import React,{useState,useEffect} from 'react'
import './profile.scss'
import { useParams } from 'react-router-dom'
import HeroSection from '../../components/heroSection/HeroSection'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub} from 'react-icons/bs'
import { imagesArray } from '../../constants/images'
import MasonaryLayout from '../../components/masonaryLayout/MasonaryLayout'
import {BsGrid1X2Fill} from 'react-icons/bs'
const Profile = () => {
  const {id} = useParams()
  const [images, setimages] = useState([])
  useEffect(() => {
    setimages(imagesArray.filter((image)=>image.userId===id))
  }, [id])
  // console.log()

  const user = {
    name:"Dharmesh Shah",
    tags:["Admin","Speaker","Writer"],
    socials:[
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
    ],
    about:"I am a developer",
    address:"Boston,MA,UnitedStates",
    pp:"/img/profileImage.jpg"
  }
  return (
    <div className='userProfile'>
      <div className="container">
        <HeroSection user={user}/>
        <hr />
        <div className='userMadePosts'>
          <span> Posts{<BsGrid1X2Fill/>}</span>
        <MasonaryLayout images={images}/>
        </div>
      </div>
    </div>
  )
}

export default Profile