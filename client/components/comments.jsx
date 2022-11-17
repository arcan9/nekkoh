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
    const backendComments = this.state.backendComments;
    const postId = this.props.postId;

    const comment = backendComments.find(c => c.postId === postId);

    // render the comment only if it exists
    if (typeof comment !== 'undefined') {
      return (
        <div>{comment.comment}</div>
      );
    }
  }
}
