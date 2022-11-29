import React from 'react';

export default function Spinner() {
  return (
    <div className='loader-container d-flex justify-content-center'>
      <div className='lds-dual-ring' />
    </div>
  );
}
