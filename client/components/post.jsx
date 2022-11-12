import React from 'react';
import EditButton from './edit-button';
import HeartIcon from './heart-icon';
import ChatBubbleIcon from './chat-bubble-icon';
import LikesCount from './likes-count';
import Username from './username';
import ViewComments from './view-comments';
import TimeCreated from './time-created';

export default function UserPost(props) {
  if (props.post.length === 0) {
    return;
  }

  return props.post.map(({ postId, mediaFile, caption }) => (
    <div className='container' key={postId}>
      <div className='post-row'>
        <div className='wrapper'>
          <div className='col-2'>
            <img src={mediaFile} />
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
            {caption}
            <ViewComments />
            <TimeCreated />
          </div>
        </div>
      </div>
    </div>
  )).reverse();
}
