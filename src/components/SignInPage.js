import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { GoogleAuthProvider, EmailAuthProvider, getAuth } from 'firebase/auth';
import { Header } from './Header.js';

const FIREBASEUI_CONFIG = {
  signInOptions: [ //array of which signin options to use
    { provider: EmailAuthProvider.PROVIDER_ID, requireDisplayName: true }, //provider with options
    GoogleAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup', //show popup to log in
  credentialHelper: 'none', //don't show an account chooser
  callbacks: {
    signInSuccessWithAuthResult: () => false //do nothing special; just return false
  }
};

export default function SignInPage(props) {
  const currentUser = props.currentUser;
  const auth = getAuth(); //the authenticator

  //if user is logged in, don't show the sign-in page but redirect instead
  //kinda hacky
  if (props.currentUser.userId) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Header currentUser={currentUser}/>
      <div className="card bg-light"> 
        <div className="container card-body">
          <StyledFirebaseAuth uiConfig={FIREBASEUI_CONFIG} firebaseAuth={auth} />
        </div>
      </div>
    </div>
  )
}