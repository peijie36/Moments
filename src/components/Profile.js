import React from 'react';
import { UserInfo } from './UserInfo';
import { ProfilePost } from './ProfilePosts.js';
import { Header } from './Header.js';
import { MobileTabbar } from './MobileTabbar';

export default function Profile(props) {
    let posts = props.data;

    return(
        <div>
            <Header currentUser={props.currentUser} loginUser={props.loginUser} />
            <main>
                <UserInfo data={posts} currentUser={props.currentUser} loginUser={props.loginUser}/>
                <ProfilePost data={posts} currentUser={props.currentUser} loginUser={props.loginUser}/>
            </main>

            <footer>
                <MobileTabbar currentUser={props.currentUser}/>
            </footer>
        </div>
    )
}