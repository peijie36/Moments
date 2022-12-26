import React from "react";
import { useState } from "react";
import { getDatabase, ref as databaseRef, set as firebaseSet, push as firebasePush } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export function Popup(props) {
    const [currFile, setFile] = useState(undefined);
    const [currScript, setScript] = useState("");
    const [currCheck1, setCheck1] = useState(false);
    const [currCheck2, setCheck2] = useState(false);
    const [currCheck3, setCheck3] = useState(false);

    const [currCheck, setCheck] = useState("");

    //image uploading!
    const getImage = (event) => {
        if (event.target.files.length > 0 && event.target.files[0]) {
            const currImage = event.target.files[0];
            setFile(currImage);
        }
    }

    const getDescription = (event) => {
        let typedDescription = event.target.value;
        setScript(typedDescription);
    }

    const getCategory1 = (event) => {
        setCheck1(true);
        setCheck2(false);
        setCheck3(false);
        setCheck(event.target.value);
    }

    const getCategory2 = (event) => {
        setCheck1(false);
        setCheck2(true);
        setCheck3(false);
        setCheck(event.target.value);
    }

    const getCategory3 = (event) => {
        setCheck1(false);
        setCheck2(false);
        setCheck3(true);
        setCheck(event.target.value);
    }

    const handleClose = () => {
        props.setTrigger(false);
        setFile(undefined);
        setCheck("");
        setScript("");
    }

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const imageType = currFile.type.slice(6);

        // Stores the image file in firebase storage
        const storage = getStorage();
        const imageRef = storageRef(storage, "userPosts/" + props.currentUser.userName + Date.now() + "." + imageType);
        await uploadBytes(imageRef, currFile)
        const imageUrlOnFirebase = await getDownloadURL(imageRef)

        //save the storage image URL in the rtdb
        const db = getDatabase();
        const postRef = databaseRef(db, "allUsers/" + props.currentUser.uid + "/posts");
        firebasePush(postRef, { URL: imageUrlOnFirebase });

        const userNameRef = databaseRef(db, "allUsers/" + props.currentUser.uid + "/userName");
        firebaseSet(userNameRef, props.currentUser.userName);

        props.addPostToDb(currCheck, currScript, imageUrlOnFirebase);
        return handleClose;
    }

    return (props.trigger) ? (
        <div className="popup">
            <form className="popup-form">
                <h2>Upload</h2>
                <button onClick={handleClose} className="close-btn btn btn-secondary">close</button>

                <div className="form-group">
                    <label>Upload your work</label>
                    <br></br>
                    <input onChange={getImage} type="file" id="myFile" name="filename" required></input>
                    <br></br>
                    <label for="description">Description</label>
                    <br></br>
                    <textarea className="form-control form-control-md" required id="description" rows="2" placeholder="Image description..." value={currScript} onChange={getDescription} ></textarea>
                </div>

                <br></br>

                <p>Choose a category</p>
                <div className="popcheck">
                    <input className="catecheck" onChange={getCategory1} checked={currCheck1} type="checkbox" value="photography"></input>
                    <label>photography</label><br></br>
                </div>
                <div className="popcheck">
                    <input className="catecheck" onChange={getCategory2} checked={currCheck2} type="checkbox" value="digital"></input>
                    <label>digital</label><br></br>
                </div>
                <div className="popcheck">
                    <input className="catecheck" onChange={getCategory3} checked={currCheck3} type="checkbox" value="painting"></input>
                    <label>painting</label><br></br>
                </div>
                <button onClick={handleImageUpload} disabled={!currScript} type="submit" className="submit btn btn-primary">Submit</button>
            </form>
        </div>
    ) : "";
}

export default Popup;