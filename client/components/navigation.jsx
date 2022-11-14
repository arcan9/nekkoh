import React from 'react';

export default function Navigation(props) {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='d-md-flex justify-content-between'>
            <div className='d-flex align-items-center justify-content-center'>
              <h1 className='nekkoh'><a href="#">Nekkoh</a></h1>
            </div>
            <div className='right-hand-nav'>
              <div className="input-group rounded search-input">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search" />
                </span>
              </div>
              {/* <i className='fa-solid fa-bars d-block d-md-none d-lg-none d-xl-none d-xxl-none d-flex justify-content-center m-3' /> */}
              <div className='navlist'>
                <ul className=''>
                  <li><a href="#">Home</a></li>
                  <li><a href="#createpost">New Post</a></li>
                  <li>Likes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
