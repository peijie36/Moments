import React, { useEffect, useState } from "react";
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
export function Favorite(props) {

    let [currImgList, setImgList] = useState("")

    const db = getDatabase();
    const allPostsRef = ref(db, "allUsers/" + props.currentUser.uid + "/likes");

    useEffect(() => {
        onValue(allPostsRef, (snapshot) => {
            const allPosts = snapshot.val();
            setImgList(allPosts);
        });
    }, [])

    if (currImgList != null) {
        let myData = Object.keys(currImgList).map(key => {
            return currImgList[key];
        })

        let imgList = myData.map((post) => {
            return (
                <li key={post.timestamp}>
                    <a href={"/" + post.timestamp}>
                        <img className="poster" src={post.URL} alt={"you liked"}></img>
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
    } else {
        return (
            <h3 className='favorite-header'>No favorites are added.</h3>
        )
    }
}