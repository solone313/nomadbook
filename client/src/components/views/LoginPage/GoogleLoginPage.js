import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from '../../../_actions/user_actions';
import { GOOGLE_CLIENT_ID } from '../../../config/key';

const GoogleLoginPage = () => {
    const responseGoogle = response => {
        console.log('responseGoogle',response);
        const tokenId = response.tokenId;
        const user = { tokenId };

        loginWithGoogle(user).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data,"여기가 데이터")
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

export default GoogleLoginPage;
