import {useEffect, useState} from "react";
import {PostList} from "../component/Post/PostList/PostList";

export const Profile = () => {

    const [user, setUser] = useState(null);

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
            {user && <PostList user={user} page="user" userInfo={false} canBeDeleted={true} /> }
        </>
    )
}