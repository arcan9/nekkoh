import React from 'react';
import Navigation from '../components/navigation';

export default function Home(props) {
  return (
    <div>
      <Navigation isEditing={props.isEditing}
      editing={false}
      searchedUser={props.searchedUser}/>
    </div>
  );
}
