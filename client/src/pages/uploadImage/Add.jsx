import React, { useReducer, useState } from "react";
import {AiOutlineCloudUpload} from 'react-icons/ai'
import "./add.scss";
import {MdClose} from 'react-icons/md'
import { wallpapers } from "../../constants/categories";
import { INITIAL_STATE, imageReducer } from "../../reducers/imageReducer";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [file, setfile] = useState("")
  const [isUploading, setisUploading] = useState(false)
  const navigate = useNavigate();
  const [error, seterror] = useState("")
  const [state,dispatch]  = useReducer(imageReducer,INITIAL_STATE)

  const handleChangeInput=(e)=>{
    dispatch({type:"CHANGE_INPUT",payload:{name:e.target.name,value:e.target.value}})
  }

  const handleTagsChange=(e)=>{
    e.preventDefault()
    dispatch({type:"ADD_TAGS",payload:e.target[0].value})
    e.target[0].value=""
  }


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setisUploading(true)
    try {
      const url = await upload(file)
      await newRequest.post('image/create-post-image',{...state,image:url})
      setisUploading(false)
      navigate('/')
    } catch (error) {
      setisUploading(false)
      seterror(error.data)
    }
   
  }



  return (
    <div className="addUpload">
      <div className="container">
        <div className="form">
          <div className="left">
          {!file ?( <>
            <label htmlFor="image">Click to Upload</label>
            <input type="file" id="image" style={{ display: "none" }} onChange={(e)=>setfile(e.target.files[0])} />
            <AiOutlineCloudUpload className="icon-upload"/>
            </>) :<>
              <MdClose className="close" onClick={()=>setfile("")}/>
             <img src={URL.createObjectURL(file)} className="uploadedFile" alt="Preview" />
             </> 
             }
          </div>
          <div className="right">
              <div className="rItem">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="" onChange={handleChangeInput} />
              </div>
              <div className="rItem">
                <label htmlFor="description">Description</label>
                <input type="text" name="desc" id="" onChange={handleChangeInput} />
              </div>
              <form className="rItem" onSubmit={handleTagsChange}>
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" id="" />
                <button>Add Tags</button>
                <div className="tags">

                {state.tags && state.tags.map((tag,idx)=>(
                  <span key={idx} className="tag" onClick={()=>dispatch({type:"REMOVE_TAGS",payload:tag})}>{tag} X</span>
                  ))}
                  </div>
              </form>
              <div className="rItem">
                <label htmlFor="cat">Category</label>
              <select name="cat" id="" onChange={handleChangeInput}>
                {wallpapers.map((wall)=>(
                  <option key={wall.id} value={wall.category}>{wall.category}</option>
                  ))}
              </select>
                  </div>
                  <button onClick={handleSubmit} disabled={isUploading} className={`${isUploading?"currentlyUploading":""}`}>{isUploading?"Uploading":"Upload"}</button>
                  {error && <span className="errorOccured">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
