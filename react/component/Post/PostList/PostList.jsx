import "./PostList.scss";
import {NewPost} from "../NewPost/NewPost";
import {Post} from "../Post/Post";
import {useEffect, useState} from "react";

export const PostList = ({user, page = "post"}) => {

    const [posts, setPosts] = useState([]);
    const [showNewPost, setShowNewPost] = useState(false);

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open("POST", "/api/" + page + "/get");
        req.onload = () => {
            const response = JSON.parse(req.responseText);
            setPosts(response.flat());
            if(page === "post"){
                setShowNewPost(true);
            }
        }
        if(user){
            req.send();
        }
        else{
            req.send(JSON.stringify({user: 0}))
        }

    }, [])


    return (
        <div className="post-list">
            {showNewPost && <NewPost user={user} />}
            <div className={"posts" + (!showNewPost ? " full" : "")}>
                {posts.map(post => <Post key={post.id} data={post} />)}
            </div>
        </div>
    )
}