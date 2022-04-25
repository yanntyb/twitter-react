import {useState} from "react";

import "./NewPost.scss";
import {Link} from "react-router-dom";

export const NewPost = ({user}) => {

    const [post, setPost] = useState("");

    const image = user.image !== "" ? user.image : require("../../../assets/image/profile-placeholder.png");

    function handleNewPost(){
        console.log(post);
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