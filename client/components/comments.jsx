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
    // console.log('backend comments:', this.state.backendComments);
    const postId = this.props.postId;
    const backendComments = this.state.backendComments;
    // const postId = this.props.postId;
    // console.log(postId);
    // console.log(backendComments.postId);

    // const comment = backendComments.filter(c => c.postId === postId);
    // const username = backendComments.filter(c => c.postId === postId);
    const commentsCopy = [...backendComments];
    // console.log('commentsCopy:', commentsCopy);

    // if (typeof commentsCopy !== 'undefined') {
    //   return commentsCopy.map(({ postId, commentId, userId, comment, username }) => (

    //     <div key={commentId}>
    //       <div className='username'>{username}</div>
    //       <div className='comment'>{comment}</div>
    //     </div>
    //   ));
    // }
    let commentary = null;

    if (typeof commentsCopy === 'undefined') {
      return;
    }

    if (this.state.commentsExist === true) {
      commentary = commentsCopy.map(data => {
        return (
          <div key={data.commentId}>
            {
              postId === data.postId
                ? (
                  <div>
                    <div>{data.username}</div>
                    <div>{data.comment}</div>
                  </div>
                  )
                : null
            }
          </div>
        );
      });
    }

    return (
      <>
        <div><a onClick={this.showComments}>View Comments</a></div>
        <div>{commentary}</div>
      </>
    );
  }
}
