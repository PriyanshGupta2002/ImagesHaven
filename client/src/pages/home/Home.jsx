import React, { useEffect } from 'react'
import './home.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import CategorySelector from '../../components/categorySelector/CategorySelector'
import MasonaryLayout from '../../components/masonaryLayout/MasonaryLayout'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const Home = () => {
  const location = useLocation();
  const params = location.search;
  const navigate = useNavigate()
  const accessToken = Cookies.get('accessToken')

  
  const {data,isLoading,refetch,isError} = useQuery({ queryKey: ['imagesPost'], queryFn: ()=>newRequest.get(`/image/getImagePosts${params}`) })
  const images = data?.data

  useEffect(() => {
   
      refetch()
    
  }, [params])
  

  useEffect(() => {
    if (!accessToken) {
      localStorage.setItem('currentUser',null)
      navigate('/login')
    }
  }, [accessToken])
  
  if (!images) {
    return "Loading..."
  }
  
  return (
    <div className='home'>
      <CategorySelector/>
      <div className="container">
<MasonaryLayout images={images} refetch={refetch} isError={isError} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Home