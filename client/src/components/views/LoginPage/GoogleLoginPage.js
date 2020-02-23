import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from '../../../_actions/user_actions';
import { GOOGLE_CLIENT_ID } from '../../../config/key';
import { useDispatch } from "react-redux";
function GoogleLoginPage (props) {
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  
    const [formErrorMessage, setFormErrorMessage] = useState('')
  
    const dispatch = useDispatch();
    const responseGoogle = response => {
        console.log('responseGoogle',response);
        const tokenId = response.tokenId;
        const user = { tokenId };

        dispatch(loginWithGoogle(response))
        .then(response => { 
                if (response.payload.loginSuccess ==true) {
                window.localStorage.setItem('userId', response.payload.userId);
               
                props.history.push("/");
              } 
                else {
                setFormErrorMessage('Check out your Account or Password again')
              }
        });
    };

    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
            />
        </div>
    );
};

export default withRouter(GoogleLoginPage);
