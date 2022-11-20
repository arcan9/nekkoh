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
    const addCommentId = this.props.postId;

    const userCommentObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    };

    fetch(`/api/comments/${addCommentId}`, userCommentObj)
      .then(res => res.json())
      .then(comment => {
        const commentsCopy = this.state.backendComments.slice();
        const newComments = commentsCopy.concat(comment);
        this.setState({
          backendComments: newComments
        });
      })
      .catch(err => console.error(err));
  }

  deleteComment(event, id) {
    event.stopPropagation();

    const deleteCommentObj = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`/api/comments/${id}`, deleteCommentObj)
      .then(res => {
        const commentsCopy = this.state.backendComments.slice();
        const updatedComments = commentsCopy.filter(c => c.commentId !== id);
        if (res.status === 204) {
          this.setState({ backendComments: updatedComments });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const postId = this.props.postId;
    const backendComments = this.state.backendComments;
    const commentsCopy = [...backendComments];
    let commentary = null;
    let form = null;

    if (typeof commentsCopy === 'undefined') {
      return;
    }

    // find matching postId and render the relevant
    // comment and username on the post
    if (this.state.commentsExist === true) {
      commentary = commentsCopy.map((data, index) => {
        return (
          <div key={data.commentId}>
            {
              postId !== data.postId
                ? (
                    null
                  )
                : (
                  <div className='commentary-wrapper'>
                    <div className='row mt-2 comment-row'>
                      <div className='col-md-12 comment-user'>{data.username}</div>
                      <div className='mt-1 comment'>{data.comment}</div>
                      {
                        data.userId === 1
                          ? (
                            <div onClick={event => this.deleteComment(event, data.commentId)}>
                              <a>Delete</a>
                            </div>
                            )
                          : null
                      }
                    </div>
                  </div>
                  )
            }
          </div>
        );
      });
    }

    // show the form only when See More anchor is clicked
    if (this.state.showForm === true) {
      form =
        <CommentForm postId={this.props.postId}
        submitText='Post'
        addComment={this.addComment}/>;
    }

    return (
      <>
        <div className='mt-3'>
          <a className='view-comments'
          onClick={this.showComments}>See More</a>
        </div>
        {commentary}
        {form}
      </>
    );
  }
}
