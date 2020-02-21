import React from "react";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from '../../../_actions/user_actions';
import { GOOGLE_CLIENT_ID } from '../../../config/key';
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

function GoogleLoginPage(props) {
    const dispatch = useDispatch();
    const responseGoogle = response => {
        console.log('responseGoogle',response);
        const tokenId = response.tokenId;
        const user = { tokenId };

        dispatch(loginWithGoogle(user))
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                props.history.push("/");
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

export default withRouter(GoogleLoginPage);
