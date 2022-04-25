import {PostList} from "../component/Post/PostList/PostList";
import {useEffect, useState} from "react";
import {Notification} from "../component/Notification/Notification";

export const Home = () => {

    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open("GET", "/api/user/getCurrent");
        req.responseType = "json";
        req.onload = () => {
            const response = req.response;
            if(response.connected){
                setUser(response.user);
            }
        }
        req.send();
    }, [])

    return (
        <>
            <Notification message={notification} />
            {user && <PostList user={user} page="post" setNotification={setNotification} /> }
        </>
    )
}