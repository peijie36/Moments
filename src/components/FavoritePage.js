import React from 'react';
import { Favorite } from './Favorite';
import { Header } from './Header.js';
import { MobileTabbar } from './MobileTabbar';

export function FavoritePage(props) {
    let posts = props.data;

    return(
        <div className='favorite-page'>
            <Header currentUser={props.currentUser} loginUser={props.loginUser} />
            <main>
                <h2 className='favorite-header'>My Favorite</h2>
                <Favorite data={posts} currentUser={props.currentUser} loginUser={props.loginUser}/>
            </main>

            <footer>
                <MobileTabbar currentUser={props.currentUser}/>
            </footer>
        </div>
    )
}