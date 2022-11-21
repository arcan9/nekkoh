import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.commentSubmit = this.commentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.commentUpdateSubmit = this.commentUpdateSubmit.bind(this);
  }

  commentSubmit(event) {
    event.preventDefault();
    this.props.addComment(this.state.text);
    this.setState({ text: '' });
  }

  commentUpdateSubmit(event) {
    event.preventDefault();
    const updatedText = this.state.text;
    const commentId = this.props.id;
    this.props.updateComment(updatedText, commentId);
  }

  handleCommentChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    const { text } = this.state;
    let textValue = text;
    let onSubmitBehavior = this.commentSubmit;

    if (this.props.isEditing === true) {
      textValue = this.props.initialComment;
      onSubmitBehavior = this.commentUpdateSubmit;
    }

    const enabled = text.length > 0;
    return (
      <form onSubmit={onSubmitBehavior}>
        <div className='row d-flex'>
          <div className='col-md-10'>
            <textarea id='comment-text-area'
          rows='2'
          defaultValue={textValue}
          onChange={this.handleCommentChange}/>
          </div>
          <div className='comment-btn-container col-md-2'>
            <button type='submit'
            className='comment-post-btn'
            disabled={!enabled}>
              {this.props.submitText}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
