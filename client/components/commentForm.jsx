import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.commentSubmit = this.commentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  commentSubmit(event) {
    event.preventDefault();
    this.props.addComment(this.state.text);
    this.setState({ text: '' });
  }

  handleCommentChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    const { text } = this.state;
    const enabled = text.length > 0;
    return (
      <form onSubmit={this.commentSubmit}>
        <div className='row d-flex'>
          <div className='col-md-10'>
            <textarea id='comment-text-area'
          rows="2"
          value={this.state.text}
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
        {/* <div className='d-flex' /> */}
      </form>
    );
  }
}
