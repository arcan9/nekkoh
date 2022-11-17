import React from 'react';

export default function Username(props) {
  // console.log('userId:', props.user);
  console.log('post:', props.post);

  const userId = props.user;
  const post = props.post;

  let index = 0;

  for (let i = 0; i < post.length; i++) {
    if (post[i].userId === userId) {
      index = i;
    }
  }

  fetch(`/api/appUsers/${userId}`)
    .then(res => res.json())
    .then(data => {
      const postCopy = post.slice();
      postCopy[index] = data;
      GetUsername(postCopy[index].username);
      // return postCopy[index].username;
    })
    .catch(err => console.error(err));

}

function GetUsername(username) {
  console.log('username:', username);
  return (
    <div>{username}</div>
  );
}
