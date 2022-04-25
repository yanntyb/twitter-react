import "./PostList.scss";
import {NewPost} from "../NewPost/NewPost";
import {Post} from "../Post/Post";
import {useEffect, useState} from "react";

export const PostList = ({user, page = "post", userInfo = true, canBeDeleted = false, setNotification}) => {

    const [posts, setPosts] = useState([]);
    const [isPostUpdated, setIsPostUpdated] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);
    const [showPost, setShowPost] = useState(false);

    function getPost(){
        const req = new XMLHttpRequest();
        req.open("POST", "/api/" + page + "/get");
        req.onload = () => {
            const response = JSON.parse(req.responseText);
            setPosts(response.flat());
            if(page === "post"){
                setShowNewPost(true);
            }
            setShowPost(true);
        }
        if(user){
            req.send(JSON.stringify({user: user.id}));
        }
        else{
            req.send(JSON.stringify({user: 0}))
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    if(isPostUpdated){
        getPost();
        setIsPostUpdated(false);
    }



    return (
        <div className="post-list">
            {showNewPost && <NewPost user={user} setIsPostUpdated={setIsPostUpdated} setNotifications={setNotification} />}
            {
                showPost &&
                <div className={"posts" + (!showNewPost ? " full" : "")}>
                    {
                        posts.map(post =>
                            <Post
                                user={user}
                                key={post.id}
                                data={post.data}
                                action={post.action || {bookmark: false, like: false}}
                                showAction={showNewPost} userInfo={userInfo}
                                canBeDeleted={canBeDeleted}
                                setIsPostUpdated={setIsPostUpdated}
                            />)
                    }
                </div>
            }

        </div>
    )
}