import "./Post.scss";
import {Action} from "../Action/Action";

export const Post = ({data}) => {

    const {user, content, like, id} = data;

    return (
        <div className="post">
            <div className="user">
                <img src={require("../../../assets/image/profile-placeholder.png")} alt={user}/>
            </div>
            <div className="content">
                {content}
            </div>
            <Action postId={id} like={like}/>
        </div>
    )
}