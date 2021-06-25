import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {
    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    };

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" alt="" />
                <h1>Sign In to Slack Clone</h1>
                <a href="https://www.sharjeelyunus.me/" target="_blank" rel="noreferrer">sharjeelyunus.me</a>
                <br />
                <Button onClick={signIn}>Sign In With Google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }

    > a {
        text-decoration: none;
        color: #E01E5A;
    }

    > button {
      margin-top: 50px;
      text-transform: inherit !important;
      background-color: #0a8d48 !important;
      color: white;
    }
`;