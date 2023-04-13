import React, { useEffect, useState } from "react";
import "./imageDetail.scss";
import { Link, useParams } from "react-router-dom";
import { AiFillTags, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Comments from "../../components/comments/Comments";
import AddComment from "../../components/addComment/AddComment";
import {useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { getTimeAgo } from "../../utils/timeago";
import { giveCurrentUser } from "../../utils/currentUser";
const ImageDetail = () => {
  const { id } = useParams();
  const currentUser = giveCurrentUser()
  const [userHasLiked, setUserHasLiked] = useState(false)
  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["imageDetail",id],
    queryFn: () => newRequest.get(`image/${id}`),
  });
  const detail = data?.data;
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: [detail?.userId],
    queryFn: () => newRequest.get(`user/${detail?.userId}`),
  });
  const time = getTimeAgo(detail?.updatedAt);
  useEffect(() => {
    if(detail?.likedBy?.includes(currentUser?._id)){
    
      setUserHasLiked(true)
    }else{
    
      setUserHasLiked(false)
    }
  }, [detail?.likedBy,currentUser._id])
  


  const handleLike=async()=>{
    const {data} = await newRequest.put(`/image/like-dislike/${id}`)
    console.log(data)
    if (data.postLiked) {
      setUserHasLiked(true)
      refetch()
    }else{
      setUserHasLiked(false)
      refetch()
    }
  }


  return (
    <div className="detail">
   {isLoading?"Loading...":isError?"Something Went wrong":<div className="container">
        <div className="left">
          <img src={detail?.image} alt="" />
        </div>
        <div className="right">
          <div className="owner">
            <h1>{detail?.title}</h1>
            {userLoading?"Loading...":userError?"Something went wrong":<Link to={`/profile/${detail?.userId}`} className="link">
              <span>By- {userData?.data?.username}</span>
            </Link>}
            <span>Country- USA</span>
            <span>{time}</span>
          </div>
          <div className="tags">
            <span>
              Tags <AiFillTags />
            </span>
            <div className="tagGrp">
              {detail?.tags?.map((tag, idx) => (
                <span className="tag" key={idx}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p>{detail?.desc}</p>

          <div className="likedBy">
            <span>{detail?.likedBy?.length}</span>

            {userHasLiked?<AiTwotoneHeart className="heart" color="red" onClick={handleLike}/>:<AiOutlineHeart className="heart" onClick={handleLike} />}

          </div>
        </div>
      </div>}

      <div className="commentSection">
        <h1>Comments</h1>
        <Comments postImageId={id} />
        <AddComment postImageId={id} />
      </div>
    </div>
  );
};

export default ImageDetail;
