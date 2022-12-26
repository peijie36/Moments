import  { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Upload_Popup';

export function MobileTabbar(props) {
    const [currButton, setButton] = useState(false);
    let currentUser = props.currentUser;

    return (
        <div className="mobile">
            <Popup trigger={currButton} setTrigger={setButton}></Popup>
            <nav className="tabbar">
                <Link to="/"><i className="bi bi-house-door" aria-label="home"></i></Link>
                {currentUser.userId ? <>
                    <Link to=""><i onClick={() => setButton(true)} className="bi bi-plus" aria-label="upload"></i></Link>
                    <Link to="/favorites"><i className="bi bi-heart" aria-label="message"></i></Link>
                    <Link to="/profile"><i className="bi bi-person-circle" aria-label="profile"></i></Link>
                </> : <>
                    <Link to="/signin"><i onClick={() => setButton(true)} className="bi bi-plus" aria-label="upload"></i></Link>
                    <Link to="/signin"><i className="bi bi-heart" aria-label="message"></i></Link>
                    <Link to="/signin"><i className="bi bi-person-circle" aria-label="profile"></i></Link>
                </>
                }
            </nav>
        </div>
    )
}