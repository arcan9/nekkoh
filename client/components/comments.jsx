import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendComments: []
    };
  }

  componentDidMount() {
    fetch('/api/comments')
      .then(res => res.json())
      .then(comments => this.setState({
        backendComments: comments
      }));
  }

  render() {
    console.log('backend comments:', this.state.backendComments);
    const backendComments = this.state.backendComments;
    const postId = this.props.postId;

    const comment = backendComments.find(c => c.postId === postId);
    const username = backendComments.find(c => c.postId === postId);
    console.log('username:', username);

    // render the comment only if it exists
    if (typeof comment !== 'undefined') {
      return (
        <>
          <div>{username.username}</div>
          <div>{comment.comment}</div>
        </>
      );
    }
  }
}
