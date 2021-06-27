import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from '../features/appSlice';
import { auth, db } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { Button } from '@material-ui/core';

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

function SidebarOption({ Icon, title, addChannelOption, id }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channelDescription, setChannelDescription] = useState('');
    const [user] = useAuthState(auth);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const addChannel = (e) => {
        e.preventDefault();

        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
                description: channelDescription,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            })
        }

        setChannelName('');
        setChannelDescription('');
    };

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
    };

    return (
        <div>
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
                        <AddChannelContainer>
                            <h2 id="transition-modal-title">Create Channel</h2>
                            <input
                                placeholder="Channel Name"
                                onChange={e => setChannelName(e.target.value)}
                                value={channelName}
                            />
                            <textarea
                                cols="30"
                                rows="10"
                                placeholder="Channel Description"
                                onChange={e => setChannelDescription(e.target.value)}
                                value={channelDescription}
                            ></textarea>
                            <Button onClick={addChannel}>Create</Button>
                        </AddChannelContainer>
                    </div>
                </Fade>
            </Modal>

            <SidebarOptionContainer
                onClick={addChannelOption ? handleOpen : selectChannel}
            >
                {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
                {Icon ? (
                    <h3>{title}</h3>
                ) : (
                    <SidebarOptionChannel>
                        <span>#</span> {title}
                    </SidebarOptionChannel>
                )}
            </SidebarOptionContainer>
        </div>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0px;
    font-weight: 300;
`;

const AddChannelContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    > h2 {
        padding: 5px;
    }

    > input {
        border: 1px solid gray;
        border-radius:3px;
        padding: 10px;
        outline: none;
        margin-bottom: 10px;
    }

    > textarea {
        border: 1px solid gray;
        border-radius:3px;
        padding: 10px;
        outline: none;
        margin-bottom: 10px;

    }

    > button {
      text-transform: inherit !important;
      background-color: var(--slack-color) !important;
      color: white;
    }
`;