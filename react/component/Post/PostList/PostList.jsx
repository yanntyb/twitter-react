import "./PostList.scss";
import {NewPost} from "../NewPost/NewPost";
import {Post} from "../Post/Post";

export const PostList = ({user}) => {

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, ante ut luctus scelerisque, sapien elit dictum felis, quis vehicula lectus mi sed est. Morbi at sapien in nulla aliquet ultricies id at mi. Proin feugiat odio in gravida ultrices. Pellentesque nisi elit, accumsan in est vitae, eleifend vestibulum enim.";

    const posts = [
        {
            id: 1,
            user: "yann",
            content: lorem,
            like: 10,
        },
        {
            id: 2,
            user: "yann",
            content: lorem,
            like: 10,
        },
        {
            id: 3,
            user: "yann",
            content: lorem,
            like: 10,
        },

    ]

    return (
        <div className="post-list">
            {user && <NewPost user={user} />}
            <div className={"posts" + (!user ? " not-connected" : "")}>
                {posts.map(post => <Post key={post.id} data={post} />)}
            </div>
        </div>
    )
}