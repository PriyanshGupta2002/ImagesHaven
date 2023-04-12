import React,{useState,useEffect} from 'react'
import './profile.scss'
import { useParams } from 'react-router-dom'
import HeroSection from '../../components/heroSection/HeroSection'
import { imagesArray } from '../../constants/images'
import MasonaryLayout from '../../components/masonaryLayout/MasonaryLayout'
import {BsGrid1X2Fill} from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import NoImage from '../../components/noImage/NoImage'
const Profile = () => {
  const {id} = useParams()
  const {isLoading,isError,data,refetch} = useQuery({ queryKey: [id], queryFn: ()=>newRequest.get(`/user/${id}`) })
const user = data?.data
const {isLoading:PostLoading,isError:PostError,data:PostData,refetch:PostRefetch} =  useQuery({ queryKey: ["images",id], queryFn: ()=>newRequest.get(`/image/getImagePosts?userId=${id}`) })
const images = PostData?.data
  return (
    <div className='userProfile'>
      <div className="container">
        <HeroSection user={user} isLoading={isLoading} isError={isError} refetch={refetch} />
        <hr />
        <div className='userMadePosts'>
          <span> Posts{<BsGrid1X2Fill/>}</span>
        {images?.length?<MasonaryLayout images={images} refetch={PostRefetch} isLoading={PostLoading} isError={PostError} />:<NoImage/>}
        </div>
      </div>
    </div>
  )
}

export default Profile