import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";

import './style.css';
import 'whatwg-fetch';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4-y0nk7s19EihRovzgCY6rISNK3i-88o",
  authDomain: "moments-175e7.firebaseapp.com",
  databaseURL: "https://moments-175e7-default-rtdb.firebaseio.com",
  projectId: "moments-175e7",
  storageBucket: "moments-175e7.appspot.com",
  messagingSenderId: "194138688888",
  appId: "1:194138688888:web:06a412d7239086e61fcc8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const allPostsRef = ref(db, "allPosts");

onValue(allPostsRef, (snapshot) => {
  const allPosts = snapshot.val();

  let myData = Object.keys(allPosts).map(key => {
    return allPosts[key];
  })
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <App data={myData} dataLength={myData.length}/>
    </BrowserRouter>
  );
});

