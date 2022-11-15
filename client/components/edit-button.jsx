import React from 'react';

export default function EditButton(props) {
  return (
    <p><a href={`#editpost?postId=${props.id}`}><i className="fa-solid fa-pen-to-square"/></a></p>
  );
}
