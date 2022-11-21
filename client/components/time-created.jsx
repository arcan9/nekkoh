import React from 'react';

export default function TimeCreated(props) {
  const timeAgo = props.dateTime;
  const time = new Date(timeAgo);
  const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const day = daysOfTheWeek[time.getDay()];

  let hour = time.getHours();
  let minutes = time.getMinutes();
  let timeOfDay = 'AM';

  if (hour === 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour -= 12;
    timeOfDay = 'PM';
  }

  if (hour < 10 || hour > 12) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (
    <div className='mt-2 timeago'>
      <span className='posted-on'>On</span>&nbsp;
      <span className='minutes-ago mt-2 pb-2'>{day} {hour}:{minutes}{timeOfDay}</span>
    </div>
  );
}
