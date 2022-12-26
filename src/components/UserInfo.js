import React, { useEffect, useState } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

export function UserInfo(props) {
    const [postCount, setPostCount] = useState(0);

    let currentUser = props.currentUser;
    let userName = currentUser.displayName;
    let avatarUrl = currentUser.photoURL || 'img/null.png';

    const db = getDatabase();
    const userPosts = ref(db, "allUsers/"+currentUser.uid+"/posts");
    useEffect(() => {
        onValue(userPosts, (snapshot) => {
            let postObjects = snapshot.val();
            setPostCount(Object.keys(postObjects).length);
        })
    })

    const [imageFile, setImageFile] = useState(undefined);
    let initialURL = props.currentUser.photoURL || '/img/null.png';
    if(props.user && props.currentUser.photoURL) {
        initialURL = props.currentUser.photoURL;
    }
    
    const [imageUrl, setImageUrl] = useState(initialURL);

    const handleChange = async (event) => {
        if(event.target.files.length > 0 && event.target.files[0]) {
            const imageFile = event.target.files[0];
            setImageFile(imageFile);
            setImageUrl(URL.createObjectURL(imageFile));
            
            const storage = getStorage();
            const imageRef = storageRef(storage, "userAvatars/"+props.currentUser.uid);
            await uploadBytes(imageRef, imageFile);
            const imageUrlOnFirebase = await getDownloadURL(imageRef);

            //save the storage image in the profile
            updateProfile(props.currentUser, { photoURL: imageUrlOnFirebase });

            //save the storage image in the rtdb
            const db = getDatabase();
            const avatarRef = ref(db, "allUsers/"+props.currentUser.uid+"/avatar");
            firebaseSet(avatarRef, imageUrlOnFirebase);

            window.location.reload(false);
        }
    }

    return(
        <div className="profile">
            <div className="profile profile-container-mobile d-flex flex-column justify-content-center">
                <label htmlFor="imageUploadInput" className="btn"><img className="profile-icon-mobile" src={avatarUrl} alt="circle shaped user profile picture"></img></label>
                <input type="file" name="image" id="imageUploadInput" className="d-none" onChange={handleChange}/>
                <br></br>
                <h2 className="username">@{userName}</h2>
            </div>
            <div className="status profile-container-mobile d-flex justify-content-center flex-wrap">
                <p className="user-stats">Posts: {postCount}</p>
            </div>
        </div>
    )
}

