import { React, useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

export function ProfilePost(props) {
    const [postArray, setPostArray] = useState([]);
    const db = getDatabase();
    const userPosts = ref(db, "allUsers/"+props.currentUser.uid+"/posts");
    useEffect(() => {
        const offFunction = onValue(userPosts, (snapshot) => {
            let postObjects = snapshot.val();
            const allPostsKeys = Object.keys(postObjects);
            let currentArray = allPostsKeys.map((key) => {
                let post = <img src={postObjects[key].URL}/>;
                return post;
            });
            setPostArray(currentArray);
        })

        const cleanup = function() {
            offFunction();
        }
        return cleanup;
    }, [])
    
    let imgList = postArray.map((post) => {
        return (
            <li key={post.props.src}>
                <a href={post.props.src} target="_blank">
                    <img className="poster" src={post.props.src} alt={"your submited pic"}></img>
                </a>
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