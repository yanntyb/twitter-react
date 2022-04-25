import "./Action.scss";

import {faBookmark, faHeart, faReply} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from "react";

export const Action = ({postId, like}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isReplied, setIsReplied] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    function handleLike(){
        const req = new XMLHttpRequest();
        req.open("POST","/api/post/like");
        req.onload = () => {
            setIsLiked(!isLiked);
        }
        req.send(JSON.stringify({id: postId, like: !isLiked}));
    }

    function handleBookmark(){
        const req = new XMLHttpRequest();
        req.open("POST", "/api/bookmark/put");
        req.onload = () => {
            setIsBookmarked(!isBookmarked)
        }
        req.send(JSON.stringify({id: postId, bookmark: !isLiked}))
    }

    return (
        <div className="action">
            <button className={"like " + isLiked.toString()} onClick={handleLike}>
                <FontAwesomeIcon icon={faHeart} /><span className="like-counter">({like})</span>
            </button>
            <button className={isReplied.toString()} onClick={() => setIsReplied(!isReplied)}>
                <FontAwesomeIcon icon={faReply} />
            </button>
            <button className={isBookmarked.toString()} onClick={handleBookmark}>
                <FontAwesomeIcon icon={faBookmark} />
            </button>
        </div>
    )
}