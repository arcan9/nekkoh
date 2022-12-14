import React from 'react';

export default function Username(props) {
  const userId = props.user;
  const posts = props.post;

  const post = posts.find(p => p.userId === userId);

  return (
    <span className='post-user'>{post.username}</span>
  );
}
