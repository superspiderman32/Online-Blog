import { useState, useEffect } from "react";

const DisplayPosts = (props) => {

  const [postArray,setPostArray]=useState([]);

  useEffect(()=>{
    fetch(`/api/posts`)
    .then(results=>results.json())
    .then(data=>setPostArray(data))
    // .then(data=>console.log(data))
    .catch((e)=> console.log("ERROR: " + e))

   
  },[]);

    return (
      <div>
        {postArray.map((post) => (
          <div key={post._id}>
            <h3>{post.postTitle}</h3>
            <p>{post.postContent}</p>
            <p>Author: {post.userInfo[0] ? post.userInfo[0].username : 'Anonymous'}</p>
            </div>
        ))}
      </div>
    );
  };
  
  export default DisplayPosts;
  
