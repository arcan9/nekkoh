import React from 'react';
import EditButton from './edit-button';
import HeartIcon from './heart-icon';
import ChatBubbleIcon from './chat-bubble-icon';
import LikesCount from './likes-count';
import Username from './username';
import ViewComments from './view-comments';
import TimeCreated from './time-created';
import Comments from './comments';

export default function UserPost(props) {
  if (props.post.length === 0) {
    return;
  }

  const posts = [...props.post];

  return posts.map(({ postId, mediaFile, caption, userId }, index) => (
    <div className='post-max-w' key={index}>
      <div className='post-w justify-content-center'>
        <div className='wrapper row d-flex'>
          <div className='col-md-6'>
            <img
            src={mediaFile}
            className='rounded img-fluid'/>
          </div>
          <div className='col-md-6'>
            <div className='user justify-content-between'>
              <div className='col-sm-6'>
                <div className='text-sm-start'>
                  <Username
                  user={userId}
                  post={props.post}/>
                </div>
              </div>
              <div className='col-sm-6 text-sm-end'>
                {
                  userId !== 1
                    ? null
                    : <EditButton
                id={postId}
                isEditing={props.isEditing}/>
                }
              </div>
            </div>
            <div className='text-sm-start'>
              <HeartIcon/>
              <ChatBubbleIcon />
              <LikesCount />
              <Username
              user={userId}
              post={props.post}/>
              {caption}
              {/* <ViewComments /> */}
              <Comments
              postId={postId}
              post={props.post}
              user={userId}/>
              <TimeCreated />
            </div>
          </div>
        </div>
      </div>
    </div>
  )).reverse();
}
