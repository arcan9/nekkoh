import React from 'react';
import SearchBar from './search-bar';

export default function Navigation(props) {
  return (
    <header>
      <nav>
        <div className='nav-container'>
          <div className='d-md-flex justify-content-between'>
            <div className='d-flex align-items-center justify-content-center'>
              <h1 onClick={props.isEditing}
              className='nekkoh'>
                <a href="#"><i className="fa-solid fa-cat me-3" />Nekkoh</a>
              </h1>
            </div>
            <div className='right-hand-nav'>
              {/* <div className="input-group rounded search-input">
                <input type="search" className="form-control rounded" placeholder="Search for user" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search" />
                </span>
              </div> */}
              <SearchBar searchedUser={props.searchedUser}/>
              <div className='navlist'>
                <ul className=''>
                  <li onClick={props.isEditing}><a href="#">Home</a></li>
                  <li onClick={props.isEditing}><a href="#createpost">New Post</a></li>
                  <li onClick={props.isEditing}><a><i className="fa-solid fa-heart likes-heart pt-2" /></a></li>
                  <li onClick={props.isEditing}><a><i className="fa-solid fa-user" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
