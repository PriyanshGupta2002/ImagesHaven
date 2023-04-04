import React from "react";
import "./add.scss";
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { wallpapers } from "../../constants/categories";
const Add = () => {
  return (
    <div className="addUpload">
      <div className="container">
        <form className="form">
          <div className="left">
            <label htmlFor="image">Click to Upload</label>
            <input type="file" id="image" style={{ display: "none" }} />
            <AiOutlineCloudUpload fontSize="30px" color="gray"/>
          </div>
          <div className="right">
              <div className="rItem">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="" />
              </div>
              <div className="rItem">
                <label htmlFor="description">Description</label>
                <input type="text" name="desc" id="" />
              </div>
              <div className="rItem">
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" id="" />
                <button>Add Tags</button>
              </div>
              <div className="rItem">
                <label htmlFor="cat">Category</label>
              <select name="cat" id="">
                {wallpapers.map((wall)=>(
                  <option key={wall.id} value={wall.category}>{wall.category}</option>
                  ))}
              </select>
                  </div>
                  <button>Upload Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
