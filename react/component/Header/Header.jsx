import "./Header.scss";
import {Link} from "react-router-dom";
import { faHome, faBell, faMessage, faBookmark, faUser, faKiwiBird } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <FontAwesomeIcon icon={faKiwiBird} />
            </div>
            <div className="links">
                <Link to="/"><FontAwesomeIcon icon={faHome}/> Home</Link>
                <Link to="/notifications"><FontAwesomeIcon icon={faBell}/> Notifications</Link>
                <Link to="/messages"><FontAwesomeIcon icon={faMessage}/> Messages</Link>
                <Link to="/fav"><FontAwesomeIcon icon={faBookmark}/> BookMarks</Link>
                <Link to="/profile"><FontAwesomeIcon icon={faUser}/> Profile</Link>
                <a href="/login"><FontAwesomeIcon icon={faUser}/> Login</a>
                <a href="/logout"><FontAwesomeIcon icon={faUser}/> Logout</a>
            </div>
        </div>
    )
}