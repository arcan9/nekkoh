import React from 'react';
import CommentForm from './commentForm';
import ChatBubbleIcon from './chat-bubble-icon';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendComments: [],
      commentsExist: false,
      showForm: false,
      isEditing: false,
      isCommentActive: null
    };
    this.showComments = this.showComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
    this.editComment = this.editComment.bind(this);
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
          backendComments: newComments,
          isEditing: false
        });
      })
      .catch(err => console.error(err));
  }

  editComment(event, id) {
    event.stopPropagation();
    this.setState({
      isEditing: true,
      isCommentActive: id
    });
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
          this.setState({
            backendComments: updatedComments,
            isEditing: false
          });
        }
      })
      .catch(err => console.error(err));
  }

  updateComment(text, id) {
    const updateCommentObj = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    };

    fetch(`/api/comments/${id}`, updateCommentObj)
      .then(res => res.json())
      .then(comment => {
        const commentsCopy = this.state.backendComments.slice();
        const result = commentsCopy.map(old => old.commentId === id
          ? comment
          : old);
        this.setState({
          backendComments: result,
          isEditing: false
        });
      })
      .catch(err => console.error(err));
  }

  cancelComment() {
    this.setState({
      isEditing: false
    });
  }

  render() {
    const postId = this.props.postId;
    const backendComments = this.state.backendComments;
    const commentsCopy = [...backendComments];
    let commentary = null;
    let form = null;

    // show the form only when icon is clicked
    if (this.state.showForm) {
      form =
        <CommentForm postId={this.props.postId}
        submitText='Post'
        addComment={this.addComment}
        isEditing={this.state.isEditing}/>;
    }

    if (this.state.isEditing) {
      form = null;
    }

    if (typeof commentsCopy === 'undefined') {
      return;
    }

    if (this.state.commentsExist) {
      commentary = commentsCopy.map((data, index) => {
        return (
          <div key={data.commentId}>
            {
              postId === data.postId
                ? (
                  <div className='commentary-wrapper'>
                    <div className='row mt-2 comment-row'>
                      <div className='col-md-12 comment-user'>{data.username}</div>
                      {
                        this.state.isEditing &&
                        data.userId === 1 &&
                        this.state.isCommentActive === data.commentId
                          ? (
                            <CommentForm
                            submitText='Edit'
                            initialComment={data.comment}
                            id={data.commentId}
                            updateComment={this.updateComment}
                            isEditing={this.state.isEditing}/>
                            )
                          : (
                            <div className='mt-1 comment'>{data.comment}</div>
                            )
                      }
                      {
                        data.userId === 1
                          ? (
                            <div>
                              <a onClick={event => this.editComment(event, data.commentId)}
                                className='edit-comment'>Edit</a>
                              <a onClick={event => this.deleteComment(event, data.commentId)}
                                className='delete-comment'>Delete</a>

                              {
                                this.state.isEditing === true &&
                                this.state.isCommentActive === data.commentId
                                  ? (
                                    <a onClick={this.cancelComment}
                                      className='cancel-comment'>Cancel</a>
                                    )
                                  : null
                              }
                            </div>
                            )
                          : null
                      }
                    </div>
                  </div>
                  )
                : (
                    null
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
          onClick={this.showComments}><ChatBubbleIcon /></a>
        </div>
        {commentary}
        {form}
      </>
    );
  }
}
