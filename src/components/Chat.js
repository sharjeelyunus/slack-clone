import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles({
    list: {
        width: 250,
        marginTop: '20px',
        padding: '20px',
    },
    fullList: {
        width: 'auto',
    },
});

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    );

    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    );

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [roomId, loading]);

    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <DetailSidebar>
                <h4><strong>#{roomDetails?.data().name}</strong></h4>
                <p>{roomDetails?.data().description}</p>
                <DetailBotton>
                    <h5>Created By</h5>
                    <img src={roomDetails?.data().userImage} alt="" />
                    <p>{roomDetails?.data().user}</p>
                    <span>{roomDetails?.data().timestamp?.toDate().toUTCString()}</span>
                </DetailBotton>
            </DetailSidebar>
        </div>
    );

    return (
        <>
            <ChatContainer>
                {roomDetails && roomMessages && (
                    <>
                        <Header>
                            <HeaderLeft>
                                <h4><strong>#{roomDetails?.data().name}</strong></h4>
                                <StarBorderOutlined />
                            </HeaderLeft>

                            <HeaderRight>
                                {['right'].map((anchor) => (
                                    <React.Fragment key={anchor}>
                                        <p onClick={toggleDrawer(anchor, true)}>
                                            <InfoOutlined /> Details
                                        </p>
                                        <SwipeableDrawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                            onOpen={toggleDrawer(anchor, true)}
                                        >
                                            {list(anchor)}
                                        </SwipeableDrawer>
                                    </React.Fragment>
                                ))}
                            </HeaderRight>
                        </Header>

                        <ChatMessage>
                            {roomMessages?.docs.map(doc => {
                                const { message, timestamp, user, userImage } = doc.data();

                                return (
                                    <Message
                                        key={doc.id}
                                        message={message}
                                        timestamp={timestamp}
                                        user={user}
                                        userImage={userImage}
                                    />
                                )
                            })}
                            <ChatBottom ref={chatRef} />
                        </ChatMessage>

                        <ChatInput
                            chatRef={chatRef}
                            channelName={roomDetails?.data().name}
                            channelId={roomId}
                        />
                    </>
                )}
            </ChatContainer>

        </>

    )
}

export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;


    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
        cursor: pointer;
    }
`;

const ChatMessage = styled.div``;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const DetailSidebar = styled.div``;

const DetailBotton = styled.div`
  position: fixed;
  bottom: 0;
  text-align: center;
  margin-bottom: 20px;

  > h5 {
      font-size: 16px;
  }

  > img {
      margin-top: 5px;
      border-radius: 50%;
  }

  > p {
      font-weight: 600;
  }

  > span {
      color: gray;
  }
`;