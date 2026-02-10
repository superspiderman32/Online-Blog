import { useState, useEffect } from "react";
import DisplayPosts from "./DisplayPosts";
import MakePost from "./MakePost";

const HandlePosts = props => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [userID, setUserID] = useState(null);

    useEffect(()=>{
        fetch(`/api/get-current-id/${props.username}`)
        .then(results=>results.json())
        .then(data=>setUserID(data[0]._id))
        .catch((e)=>console.log("ERROR IN EFFECT ID:"+e))
        console.log(userID);
    },[]);

    return (
        <div>
            <MakePost
                setPosts={setPosts}
                postTitle={postTitle}
                postContent={postContent}
                setPostTitle={setPostTitle}
                setPostContent={setPostContent}
                setSuccessMessage={setSuccessMessage}
                userID={userID} 
                setUserID={setUserID}
                username={props.username}
            />
            <DisplayPosts posts={posts} />
        </div>
    );
};

export default HandlePosts;
