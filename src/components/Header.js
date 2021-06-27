import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Header() {
    const [user] = useAuthState(auth);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Slack Clone</h2>
                        <p id="transition-modal-description">
                            A Scoial Network App (Replica of Slack) built with Reactjs 🚀
                            <br />
                            <strong>Guide</strong>
                            <br />
                            There are different chat rooms organized by topic <br />
                            Click the desired channel to enter the Chat <br />
                            If you want to create another channel than just click on <br />
                            + Add Channel button, and Create your own room <br />
                            <strong>Tech Stack</strong>
                            <ul>
                                <li>React js</li>
                                <li>Redux</li>
                                <li>Firebase Firestore DB</li>
                                <li>Material UI</li>
                                <li>React Router</li>
                                <li>Google Authentication</li>
                            </ul>
                            <span>Made with 🖤 by <a href="https://github.com/sharjeelyunus">Sharjeel Yunus</a></span>

                        </p>
                    </div>
                </Fade>
            </Modal>

            <HeaderContainer>
                <HeaderLeft>
                    <HeaderAvatar
                        onClick={() => auth.signOut()}
                        alt={user?.displayName}
                        src={user?.photoURL}
                    />
                    <AccessTimeIcon />
                </HeaderLeft>
                <HeaderSearch>
                    <SearchIcon />
                    <input placeholder="Search" />
                </HeaderSearch>
                <HeaderRight>
                    <HelpOutlineIcon onClick={handleOpen} />
                </HeaderRight>
            </HeaderContainer>
        </>
    )
}

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;

    }
`;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
        cursor: pointer;
    }
`;