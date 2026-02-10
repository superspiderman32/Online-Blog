import { useState, useEffect } from "react";

const MakePost = props => {

    
    const submitClicked = async (e) => {
        e.preventDefault();
    
        const title = props.postTitle;
        const content = props.postContent;
        const userID = props.userID;
    
        if (!title || !content) {
            props.setSuccessMessage("Please fill in both title and content for the post.");
            return;
        }
    
        const newPost = { title, content, userID };
    
        try {
            const response = await fetch("/api/make-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("OK");
                props.setSuccessMessage("Post submitted successfully!");
                props.setPosts((prevPosts) => [data, ...prevPosts]);
                props.setPostTitle("");
                props.setPostContent("");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
    
            // const data = await response.json();
            // props.setSuccessMessage("Post submitted successfully!");
            // props.setPosts((prevPosts) => [data, ...prevPosts]);
            // props.setPostTitle("");
            // props.setPostContent("");
    
        } catch (err) {
            console.error("Error submitting post:", err);
            props.setSuccessMessage("Error submitting post!");
        }
    };
    

    useEffect(() => {
        console.log("Received userID in make:", props.userID);
    }, [props.userID]);

    return (
        <div>
            <header>
                <h2>Create and Display Posts</h2>
                <h3>{props.successMessage}</h3>
            </header>

            <main>
                <form onSubmit={submitClicked}>
                    <fieldset>
                        <label>Make a Post Title:</label>
                        <input
                            type="text"
                            value={props.postTitle}
                            onChange={(e) => props.setPostTitle(e.target.value)}
                        />
                        <br />

                        <label>Make Post Content:</label>
                        <input
                            type="text"
                            value={props.postContent}
                            onChange={(e) => props.setPostContent(e.target.value)}
                        />
                        <br />

                        <button type="submit">Submit</button>
                    </fieldset>
                </form>
            </main>
        </div>
    );
};

export default MakePost;
