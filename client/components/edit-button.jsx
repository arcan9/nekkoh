import React from 'react';

export default function EditButton(props) {
  return (
    <p className='mb-1'>
      <a href={`#editpost?postId=${props.id}`}>
        <i onClick={props.isEditing}className="fa-solid fa-pen-to-square"/>
      </a>
    </p>
  );
}
