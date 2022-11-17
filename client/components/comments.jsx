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
    return backendComments.map(({ comment, commentId }) => (
      <div key={commentId}>{comment}</div>
    ));
  }
}
