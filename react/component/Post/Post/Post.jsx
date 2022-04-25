import "./Post.scss";
import {Action} from "../Action/Action";

export const Post = ({data, action, showAction, user, userInfo = true, canBeDeleted = false, setIsPostUpdated}) => {

    const {bookmark, like} = action;
    const {content, id, date} = data;

    function handleDelete(){
        const req = new XMLHttpRequest();
        req.open("POST", "/api/post/remove");
        req.onload = () => {
            setIsPostUpdated(true);
        }
        req.send(JSON.stringify({post: id}));
    }

    return (
        <div className="post">
            {
                userInfo &&
                <div className="user">
                    <img src={require("../../../assets/image/profile-placeholder.png")} alt={user.email}/>
                    <span>{user.email}</span>
                </div>
            }

            <div className="content">
                {content}
                <div className="date">
                    {(new Date(date)).toDateString()}
                </div>
            </div>
            {canBeDeleted && <button className="delete" onClick={handleDelete}>x</button>}
            {showAction && <Action postId={id} bookmarked={bookmark} liked={like} />}
        </div>
    )
}