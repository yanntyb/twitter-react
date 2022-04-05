import {PostList} from "../component/Post/PostList/PostList";
import {useEffect, useState} from "react";

export const Home = () => {

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
            <PostList user={user} />
        </>
    )
}