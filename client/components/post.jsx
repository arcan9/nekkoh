import React from 'react';
import EditButton from './edit-button';
import HeartIcon from './heart-icon';
import ChatBubbleIcon from './chat-bubble-icon';
import LikesCount from './likes-count';
import Username from './username';
// import GetUsername from './username';
import ViewComments from './view-comments';
import TimeCreated from './time-created';

export default function UserPost(props) {
  if (props.post.length === 0) {
    return;
  }

  const posts = [...props.post];
  // console.log('props.posts:', posts);

  return posts.map(({ postId, mediaFile, caption, userId }, index) => (
    <div className='post-max-w' key={index}>
      <div className='post-w justify-content-center'>
        <div className='wrapper row d-flex'>
          <div className='col-md-6'>
            <img src={mediaFile} className='rounded img-fluid'/>
          </div>
          <div className='col-md-6'>
            <div className='user justify-content-between'>
              <div className='col-sm-6'>
                <p className='text-sm-start'>catnip_13</p>
              </div>
              <div className='col-sm-6 text-sm-end'>
                <EditButton id={postId} isEditing={props.isEditing}/>
              </div>
            </div>
            <div className='text-sm-start'>
              <HeartIcon/>
              <ChatBubbleIcon />
              <LikesCount />
              <Username user={userId} post={props.post}/>
              {caption}
              <ViewComments />
              <TimeCreated />
            </div>
          </div>
        </div>
      </div>
    </div>
  )).reverse();
}
