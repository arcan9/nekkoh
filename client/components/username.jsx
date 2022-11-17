import React from 'react';

export default function Username(props) {
  console.log('userId:', props.user);
  console.log('post:', props.post);

  const userId = props.user;
  const post = props.post;

  let index = 0;

  for (let i = 0; i < post.length; i++) {
    if (post[i].postId === userId) {
      index = i;
      console.log('index:', index);
    }
  }

  fetch(`/api/posts/${userId}`)
    .then(res => res.json())
    .then(data => {
      const postCopy = post.slice();
      postCopy[index] = data;
      console.log('data:', data);
    })
    .catch(err => console.error(err));

  return (
    <div>{props.user}</div>
  );
}
