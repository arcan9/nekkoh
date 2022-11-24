import React from 'react';

export default function EditButton(props) {
  // console.log(props.editing);
  return (
    <p className='mb-0'>
      <a href={`#editpost?postId=${props.id}`}>
        <i onClick={props.isEditing}
        className="fa-solid fa-pen-to-square"/>
      </a>
    </p>
  );
}
