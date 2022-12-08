import React from 'react';
import EditButton from './edit-button';
import HeartIcon from './heart-icon';
import Username from './username';
import TimeCreated from './time-created';
import Comments from './comments';

export default class RenderSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPosts: props.post
    };
  }

  componentDidMount() {
    const queryValue = this.props.queryValue;

    fetch(`api/appUsers/?q=${queryValue}`)
      .then(res => res.json())
      .then(user => this.setState({ searchedPosts: user }))
      .catch(err => console.error(err));
  }

  render() {
    const searchedPosts = this.state.searchedPosts;

    console.log('searchedPosts state:', this.state.searchedPosts);
    console.log('searchPosts array length:', this.state.searchedPosts.length);

    if (searchedPosts.length === 0) {
      return;
    }

    return searchedPosts.map(({ postId, mediaFile, caption, userId, createdAt }, index) => (
      <div className='post-max-w col-6' key={postId}>
        <div className='post-w-main justify-content-center'>
          <div className='wrapper row d-flex ps-0 pe-0'>
            <div className='user justify-content-between'>
              <div className='col-sm-6'>
                <div className='text-sm-start'>
                  <i className="fa-solid fa-paw me-2" />
                  <Username
                  user={userId}
                  post={searchedPosts}/>
                </div>
              </div>
              <div className='col-sm-6 text-sm-end'>
                {
                  userId !== 1
                    ? null
                    : <EditButton
                id={postId}
                editing={this.props.editing}/>
                }
              </div>
            </div>
            <div className='flex-column-reverse p-0 mt-2'>
              <img
            src={mediaFile}
            className='img-fluid'/>
            </div>
            <div className='flex-column-reverse'>

              <div className='text-sm-start'>
                <HeartIcon/>
                <Username
              user={userId}
              post={searchedPosts}/>
                <div>{caption}</div>
                <TimeCreated dateTime={createdAt}/>
                <Comments
              postId={postId}
              post={this.props.post}
              user={userId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )).reverse();
  }
}
