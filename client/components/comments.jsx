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
      commentsExist: !this.state.commentsExist
    });
  }

  render() {
    const postId = this.props.postId;
    const backendComments = this.state.backendComments;

    const commentsCopy = [...backendComments];
    let commentary = null;

    if (typeof commentsCopy === 'undefined') {
      return;
    }

    // if (postId !== commentsCopy)

    if (this.state.commentsExist === true) {
      commentary = commentsCopy.map(data => {
        return (
          <div key={data.commentId}>
            {
              postId !== data.postId
                ? (
                    null
                  )
                : (
                  <div className='row mt-2'>
                    <div className='col-md-12 comment-user'>{data.username}</div>
                    <div className='mt-1 comment'>{data.comment}</div>
                  </div>
                  )
            }
          </div>
        );
      });
    }

    return (
      <>
        <div className='mt-3'>
          <a className='view-comments'
          onClick={this.showComments}>View Comments</a>
        </div>
        <div>{commentary}</div>
      </>
    );
  }
}
