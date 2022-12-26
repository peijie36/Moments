import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

import { Link } from 'react-router-dom';
import Popup from './Upload_Popup';

import { getAuth, signOut } from 'firebase/auth';

export function Nav(props) {
    const [currButton, setButton] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    const currentUser = props.currentUser;
    let avatarUrl = props.currentUser.photoURL || '/img/null.png';


    const openProfileDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    const addPost = (category, description, src) => {
        const db = getDatabase();
        const allPostsRef = ref(db, "allPosts");
        // Initialize the data for the new post
        let newPost = {
            userId: props.currentUser.uid,
            userName: props.currentUser.userName,
            timestamp: Date.now(),
            category: category,
            description: description,
            src: src
        }

        firebasePush(allPostsRef, newPost);
    }

    return (
        <nav className="pc topnav">
            <h1>Moments</h1>
            <Link to="/">Home</Link>
            {currentUser.userId ? <Link to="/favorites">Favorites</Link> : <Link to="/signin">Favorites</Link>}
            <Link to="/about">About</Link>
            {currentUser.userId ? <>
                <div className="icon-block">
                    <a href="#" onClick={openProfileDropdown}><img className="icon" src={avatarUrl} alt="circle shaped user profile picture"></img></a>
                    {openDropdown && <ProfileDropdown currentUser={props.currentUser} />}
                </div>

                <button onClick={() => setButton(true)} type="ubtton" className="btn btn-info">Upload</button>
                <Popup trigger={currButton} setTrigger={setButton}  currentUser={props.currentUser} addPostToDb={addPost}></Popup>
            </> : <>
                <div className="icon-block">
                    <Link to="/signin" className="dropdown-item">Sign In</Link>
                </div>
            </>
            }
        </nav>
    );
}

function ProfileDropdown(props) {
    const handleSignOut = (event) => {
        signOut(getAuth());
    }

    return (
        <div className="dropdown">
            <Link to="/profile" className="dropdown-item">Profile</Link>
            <Link to="/signin" className="dropdown-item" onClick={handleSignOut}>Log out</Link>
        </div>
    );
}