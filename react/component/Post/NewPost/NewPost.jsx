import {useState} from "react";

import "./NewPost.scss";
import {Link} from "react-router-dom";

export const NewPost = ({user, setIsPostUpdated}) => {

    const [post, setPost] = useState("");

    let image;

    if(user){
        image = user.image !== "" ? user.image : require("../../../assets/image/profile-placeholder.png");
    }
    else{
        image = require("../../../assets/image/profile-placeholder.png");
    }


    function handleNewPost(){
        const req = new XMLHttpRequest();
        req.open("POST", "/api/post/new");
        req.onload = () => {
            setPost("");
            setIsPostUpdated(true)
        }
        req.send(JSON.stringify({post: post}));
    }

    return (
        <div className="post-new">
            <Link to="/profile"><img src={image} alt=""/></Link>
            <div className="form">
                <input placeholder="What's happening ?" type="text" value={post} onChange={e => setPost(e.target.value)}/>
                <button onClick={handleNewPost}>Tweet</button>
            </div>
        </div>
    )
}