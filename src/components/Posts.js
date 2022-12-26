import React from "react";
import { Link } from "react-router-dom";

export function Post(props) {
    let postsList = props.data;
    let imgList = postsList.map((post) => {
        let url = "/" + post.timestamp;
        return (
            <li key={post.timestamp}>
                <Link to={url}>
                    <img className="poster" id={post.id} src={post.src} alt={post.description} user={post.username} category={post.category}></img>
                </Link>
            </li>
        );
    });
    return (
        <div className="gallery">
            <ul className="container-fluid img-ls">
                {imgList}
            </ul>
        </div>
    )
}