import React from 'react';

export default function Navigation(props) {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='d-flex justify-content-between'>
            <div>
              <h1 className='nekkoh'><a href="#">Nekkoh</a></h1>
            </div>
            <div>
              <input className='search-bar' type="text" placeholder='Search' />
              <i className='fa-solid fa-bars d-block d-md-none d-lg-none d-xl-none d-xxl-none' />
              <ul className='nav-list'>
                <li><a href="#">Home</a></li>
                <li><a href="#createpost">New Post</a></li>
                <li>Likes!</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
