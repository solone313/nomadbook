import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from '../../../_actions/user_actions';
import config from '../../../config/key';
import { useDispatch } from "react-redux";
function GoogleLoginPage (props) {
    const [formErrorMessage, setFormErrorMessage] = useState('')

    const dispatch = useDispatch();
    const responseGoogle = response => {
        console.log('responseGoogle',process.env.GOOOGLE_CLIENT_ID);
        dispatch(loginWithGoogle(response))
        .then(response => { 
                if (response.payload.loginSuccess === true) {
                window.localStocrage.setItem('userId', response.payload.userId);            
                props.history.push("/");
              } 
                else {
                setFormErrorMessage('Check out your Account or Password again')
              }
        });
    };

    return (
        <div className="pb-3">
            {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
            )}
            <GoogleLogin
                clientId={`${config.GOOGLE_CLIENT_ID}`}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
            />
        </div>
    );
};

export default withRouter(GoogleLoginPage);
