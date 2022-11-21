import React from 'react';
import EditButton from './edit-button';
import HeartIcon from './heart-icon';
// import LikesCount from './likes-count';
import Username from './username';
import TimeCreated from './time-created';
import Comments from './comments';

export default function UserPost(props) {
  if (props.post.length === 0) {
    return;
  }

  const posts = [...props.post];

  return posts.map(({ postId, mediaFile, caption, userId, createdAt }, index) => (
    <div className='post-max-w col-6' key={postId}>
      <div className='post-w-main justify-content-center'>
        <div className='wrapper row d-flex ps-0 pe-0'>
          <div className='user justify-content-between'>
            <div className='col-sm-6'>
              <div className='text-sm-start'>
                <i className="fa-solid fa-paw me-2" />
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
                editing={props.editing}/>
                }
            </div>
          </div>
          <div className='flex-column-reverse p-0 mt-2'>
            <img
            src={mediaFile}
            className='img-fluid'/>
          </div>
          <div className='flex-column-reverse'>

            <div className='text-sm-start'>
              <HeartIcon/>
              {/* <LikesCount /> */}
              <Username
              user={userId}
              post={props.post}/>
              <div>{caption}</div>
              <TimeCreated dateTime={createdAt}/>
              <Comments
              postId={postId}
              post={props.post}
              user={userId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )).reverse();
}
