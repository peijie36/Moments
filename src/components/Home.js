import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue, set } from 'firebase/database';
import _ from 'lodash';

import { Nav } from './NavigationHome.js';
import { Post } from './Posts.js';
import { Footer } from './Footer.js';
import { MobileFilter } from './MobileFilter.js';
import { MobileTabbar } from './MobileTabbar.js';

export default function Home(props) {

    const [includePhotography, setPhotography] = useState(false);
    const [includeDigital, setDigital] = useState(false);
    const [includePainting, setPainting] = useState(false);
    // All posts stored in rtdb
    const [currentPosts, setCurrentPosts] = useState([]);

    const selectFilterCallback = (photography, digital, painting) => {
        setPhotography(photography);
        setDigital(digital);
        setPainting(painting);
    }

    // Add onValue listener in effect hook
    useEffect(() => {
        const db = getDatabase();
        const allPostsRef = ref(db, "allPosts");
        let allPostsArray = [];

        //register a listener for changes to that value location
        onValue(allPostsRef, (snapshot) => {
            const allPostsObject = snapshot.val();

            //an array of the keys in the object ["-KyxgJhKOVeAj2ibPxrO", "-KyxgMDJueu17348NxDF"]
            const allPostsKeys = Object.keys(allPostsObject);

            //map array of keys into array of tasks
            allPostsArray = allPostsKeys.map((key) => {
                const singlePostCopy = { ...allPostsObject[key] }; //copy element at that key
                singlePostCopy.key = props.currentUser.uid + key;; //save the key string as an "id" for later
                return singlePostCopy; //the transformed object to store in the array
            });
        })
        //can do something with allPostsArray (e.g., assign to a state variable)
        setCurrentPosts(allPostsArray);
    }, [])

    // Capture new photos added from the upload form and append it to firebase DB
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

    // Set posts that match the search string in state variables
    const [searchResult, setSearchResult] = useState([]);
    const [searchString, setSearchString] = useState("");
    const searchResultCallBack = function (searchResult, query) {
        setSearchResult(searchResult);
        setSearchString(query);
    }

    // Handles which set of posts to show
    let displayed = [];
    if (searchString === "") {
        displayed = [...currentPosts];
    } else {
        displayed = [...searchResult];
    }

    displayed = displayed.filter((picture) => {
        if (includePhotography == false && includeDigital == false && includePainting == false) {
            return true;
        } else if (includePhotography && picture["category"] == "photography") {
            return true;
        } else if (includeDigital && picture["category"] == "digital") {
            return true;
        } else if (includePainting && picture["category"] == "painting") {
            return true;
        }
    })

    // use one with timestamp --> sorts photo gallery from latest
    _.reverse(displayed, "timestamp");

    return (
        <div>
            <header>
                <div className="mobile top_display">
                    <h1 className="head">Moments</h1>
                    <MobileFilter selectFilter={selectFilterCallback} />
                </div>
                <Nav searchResult={searchResultCallBack} selectFilter={selectFilterCallback} getAllPostsCallback={addPost} currentUser={props.currentUser} />
            </header>

            <main>
                <Post data={displayed} />
            </main>

            <footer>
                <Footer />
                <MobileTabbar currentUser={props.currentUser} />
            </footer>
        </div>
    )
}