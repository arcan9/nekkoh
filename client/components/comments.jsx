import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendComments: [],
      commentsExist: false
    };
    this.showComments = this.showComments.bind(this);
  }

  componentDidMount() {
    fetch('/api/comments')
      .then(res => res.json())
      .then(comments => this.setState({
        backendComments: comments
      }));
  }

  showComments() {
    this.setState({
      commentsExist: true
    });
  }

  render() {
    // console.log('backend comments:', this.state.backendComments);
    const backendComments = this.state.backendComments;
    const postId = this.props.postId;

    const comment = backendComments.find(c => c.postId === postId);
    const username = backendComments.find(c => c.postId === postId);

    let userComments = null;

    if (this.state.commentsExist === true) {
      userComments =
        <div className='row mt-2'>
          <div className='col-md-12'>
            <div>{username.username}</div>
            <div className='mt-1'>{comment.comment}</div>
          </div>
        </div>;
    }

    // render the comment only if it exists
    if (typeof comment !== 'undefined' || typeof username !== 'undefined') {
      return (
        <>
          <div className='mt-4'>
            <a className='view-comments' onClick={this.showComments}>View Comments</a>
          </div>
          {userComments}
        </>
      );
    }
  }
}
