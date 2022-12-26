import React, { useState } from 'react';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Popup from './Upload_Popup';

export function Nav(props) {
    let data = props.data;

    const [currButton, setButton] = useState(false);
    const [includePhotography, setPhotography] = useState(false);
    const [includeDigital, setDigital] = useState(false);
    const [includePainting, setPainting] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    
    // the search result
    const [searchPosts, setSearchPosts] = useState([]);

    const currentUser = props.currentUser;
    let avatarUrl = currentUser.photoURL || 'img/null.png';

    const checkPhotography = (event) => {
        setPhotography(event.target.checked);
        props.selectFilter(!includePhotography, includeDigital, includePainting);
    }

    const checkDigital = (event) => {
        setDigital(event.target.checked);
        props.selectFilter(includePhotography, !includeDigital, includePainting);
    }

    const checkPainting = (event) => {
        setPainting(event.target.checked);
        props.selectFilter(includePhotography, includeDigital, !includePainting);
    }

    const openProfileDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    
    const showSearch = (event) => {
        let query = event.target.value;
        const db = getDatabase();
        const allUsersRef = ref(db, "allPosts");
        onValue(allUsersRef, (snapshot) => {
            const allUsersObject = snapshot.val();
            const allUsersKeys = Object.keys(allUsersObject);

            const usersObject = allUsersKeys.map((key) => {
                const singleUserCopy = { ...allUsersObject[key] }; //copy element at that key
                singleUserCopy.key = key;; //save the key string as an "id" for later
                return singleUserCopy; //the transformed object to store in the array
            });

            const searchFilteredObject = usersObject.filter((object) => {
                return object.userName.toLowerCase().startsWith(query.toLowerCase())
            })
            //setSearchPosts(searchFilteredObject);
            props.searchResult(searchFilteredObject, query);
        })
    }

    return (
        <nav className="pc topnav">
            <h1>Moments</h1>
            <Link to="/">Home</Link>
            {currentUser.userId ? <Link to="/favorites">Favorites</Link> : <Link to="/signin">Favorites</Link>}
            <Link to="/about">About</Link>
            <div className="search-block">
                <form action="/profile">
                    <div className="search">
                        <input type="text" placeholder="Search for specific user posts..." onChange={showSearch}></input>
                    </div>
                    <div className="check">
                        <input type="checkbox" value="photography" checked={includePhotography} onChange={checkPhotography}></input>
                        <label>photography</label><br></br>
                    </div>
                    <div className="check">
                        <input type="checkbox" value="digital" checked={includeDigital} onChange={checkDigital}></input>
                        <label>digital</label><br></br>
                    </div>
                    <div className="check">
                        <input type="checkbox" value="painting" checked={includePainting} onChange={checkPainting}></input>
                        <label>painting</label><br></br>
                    </div>
                </form>
                <a href="#"><img className="search-button" src="img/icons8-search-48.png" alt="search button"></img></a>
            </div>

        {currentUser.userId ? <>
            <div className="icon-block">
                <a href="#" onClick={openProfileDropdown}><img className="icon" src={avatarUrl} alt="circle shaped user profile picture"></img></a>
                {openDropdown && <ProfileDropdown currentUser={props.currentUser} />}
            </div>
            <button onClick={() => setButton(true)} type="ubtton" className="btn btn-info">Upload</button>
            <Popup data={data} dataLength={props.dataLength} trigger={currButton} setTrigger={setButton} currentUser={props.currentUser} addPostToDb={props.getAllPostsCallback}></Popup>
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