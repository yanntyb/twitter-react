import "./Post.scss";
import {Action} from "../Action/Action";

export const Post = ({data}) => {

    const {user, content, id, bookmark, reply, like} = data;

    return (
        <div className="post">
            <div className="user">
                <img src={require("../../../assets/image/profile-placeholder.png")} alt={user.email}/>
                <span>{user.email}</span>
            </div>
            <div className="content">
                {content}
            </div>
            <Action postId={id} like={like}/>
        </div>
    )
}