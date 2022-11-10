import React from 'react';
import EditButton from './edit-button';
import HeartIcon from './heart-icon';
import ChatBubbleIcon from './chat-bubble-icon';
import LikesCount from './likes-count';
import Username from './username';
import Comment from './comment';
import ViewComments from './view-comments';
import TimeCreated from './time-created';

export default function UserPost(props) {
  return (
    <div className='container'>
      <div className='post-row'>
        <div className='wrapper'>
          <div className='col-2'>
            <img src='https://i.pinimg.com/736x/ab/91/ee/ab91eef95a4b974f3dcb32c497802f08.jpg' />
          </div>
          <div className='col-2'>
            <div className='user'>
              <div className='col-2'>
                <p>catnip_13</p>
              </div>
              <div className='col-2 text-right'>
                <EditButton />
              </div>
            </div>
            <HeartIcon/>
            <ChatBubbleIcon />
            <LikesCount />
            <Username />
            <Comment />
            <ViewComments />
            <TimeCreated />
          </div>
        </div>
      </div>
    </div>
  );
}
