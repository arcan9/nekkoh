import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: ''
    };
    this.commentSubmit = this.commentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  commentSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.text);
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
      <>
        <div>CommentForm</div>
        <form onSubmit={this.commentSubmit}>
          <textarea id='comment-text-area'
          cols="30"
          rows="4"
          value={this.state.text}
          onChange={this.handleCommentChange}/>
          <div>
            <button type='submit'
            className='comment-post-anchor'
            disabled={!enabled}>
              {this.props.submitText}
            </button>
          </div>
        </form>
      </>
    );
  }
}
