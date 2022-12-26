import React from 'react';
import { Nav } from './Navigation.js';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export function Header(props) {
    const handleSignOut = (event) => {
        signOut(getAuth());
    }

    return(
        <header>
            <div className="mobile top_display">
                <h1 className="head">Moments</h1>
                <Link to="/signin"><h2 className="head btn" onClick={handleSignOut}>Logout</h2></Link>
            </div>
            <Nav currentUser={props.currentUser}/>
        </header>
    )
}