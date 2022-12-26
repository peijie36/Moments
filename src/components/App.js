import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Profile from './Profile.js';
import Home from './Home.js';
import SignInPage from './SignInPage';
import { About } from './About.js';
import { Detail } from './Detail.js';
import { FavoritePage } from './FavoritePage.js';

function App(props) {
    const nullUser = {userId:null, userName:null}
    const [currentUser, setCurrentUser] = useState(nullUser);

    useEffect(() => {
        const auth = getAuth();
        
        onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
            }
            else {
                setCurrentUser(nullUser);
            }
        });
    }, [])

    return (
        <Routes>
            <Route path="" element={<Home currentUser={currentUser} />} />
            <Route path="profile" element={<Profile data={props.data} currentUser={currentUser}/>} />
            <Route path="/:id" element={<Detail data={props.data} currentUser={currentUser} />}/>
            <Route path="about" element={<About currentUser={currentUser} />} />
            <Route path="favorites" element={<FavoritePage data={props.data} currentUser={currentUser} />} />
            <Route path="signin" element={<SignInPage currentUser={currentUser} />} />
        </Routes>
    )
}

export default App;