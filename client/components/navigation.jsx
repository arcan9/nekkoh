import React from 'react';

export default function Navigation(props) {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='row justify-sb'>
            <div>
              <h1 className='nekkoh'>Nekkoh</h1>
            </div>
            <div>
              <input className='search-bar' type="text" placeholder='Search' />
              <ul className='nav-list'>
                <li>Home</li>
                <li>New Post</li>
                <li>Likes</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
