import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header.js";
import { MobileTabbar } from "./MobileTabbar";
import { getDatabase, ref as databaseRef, set as firebaseSet, push as firebasePush } from 'firebase/database';
export function Detail(props) {
    let param = useParams();
    let stamp = param.id;

    let data = props.data;
    let myobject = data.filter(objects => objects.timestamp == stamp)

    myobject = myobject[0];


    let [isliked, setliked] = useState(false);
    const likeButtonClick = function(event) {
        setliked(true);

        const db = getDatabase();
        const postRef = databaseRef(db, "allUsers/"+props.currentUser.uid+"/likes");
        firebasePush(postRef, {URL: myobject.src, timestamp: myobject.timestamp});
    }

    return (
        <>
            <Header currentUser={props.currentUser} loginUser={props.loginUser} />
            <div className="detail">
                <img src={myobject.src} alt={myobject.description}></img>

                <div className="artist-info">
                    <p>Artist: {myobject.userName}</p>
                    <p>Description: {myobject.description}</p>
                    <p>Category: {myobject.category}</p>
                    <button onClick={likeButtonClick} disabled={isliked} type="like" className="likebutton btn btn-danger">Add to My Favorite</button>
                </div>

                
            </div>
            <MobileTabbar currentUser={props.currentUser}/>
        </>
    )
}