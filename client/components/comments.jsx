import React from 'react';
import CommentForm from './commentForm';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendComments: [],
      commentsExist: false,
      showForm: false
    };
    this.showComments = this.showComments.bind(this);
    this.addComment = this.addComment.bind(this);
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
      commentsExist: !this.state.commentsExist,
      showForm: !this.state.showForm
    });
  }

  addComment(text) {
    console.log('addComment:', text);
    console.log('comment posted on postId:', this.props.postId);

    const addCommentId = this.props.postId;

    const userCommentObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    };

    fetch(`/api/comments/${addCommentId}`, userCommentObj)
      .then(res => res.json())
      .then(comment => {
        console.log(comment);
        const commentsCopy = this.state.backendComments.slice();
        const newComments = commentsCopy.concat(comment);
        this.setState({
          backendComments: newComments
        });
      })
      .catch(err => console.error(err));
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

    let form = null;

    if (this.state.showForm === true) {
      form =
        <CommentForm postId={this.props.postId}
        submitText='Post'
        handleSubmit={this.addComment}/>;
    }

    return (
      <>
        <div className='mt-3'>
          <a className='view-comments'
          onClick={this.showComments}>View Comments</a>
        </div>
        <div>{commentary}</div>
        {form}
      </>
    );
  }
}
