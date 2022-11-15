import React from 'react';
import ViewComments from '../components/view-comments';
import TimeCreated from '../components/time-created';

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      imagePreview: 'https://raw.githubusercontent.com/arcan9/code-journal/main/images/placeholder-image-square.jpg',
      isEditing: false
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  /* replaces image preview with the target file */
  handleImage(event) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          imagePreview: reader.result
        });
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    /* Reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState */
  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('caption', this.state.caption);
    formData.append('image', this.fileInputRef.current.files[0]);

    const formDataObject = {
      method: 'POST',
      body: formData
    };

    fetch('/api/uploads', formDataObject)
      .then(res => res.json())
      .then(imgData => {
        this.setState({
          caption: ''
        });
        this.fileInputRef.current.value = null;
        window.location.hash = '';
        this.props.getPosts();
      })
      .catch(err => console.error(err));

  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({
      isEditing: true
    });

    // let userPost = null;
    let index = 0;

    const currentUserPosts = this.props.post;
    const editingPostId = this.props.postId;
    console.log('this.props.postId --->', editingPostId);

    for (let i = 0; i < currentUserPosts.length; i++) {
      if (currentUserPosts[i].postId === editingPostId) {
        index = i;
      }
    }

    const formData = new FormData();

    formData.append('caption', this.state.caption);
    formData.append('image', this.fileInputRef.current.files[0]);

    const userPostObj = {
      method: 'PUT',
      body: formData
    };

    fetch(`api/posts/${editingPostId}`, userPostObj)
      .then(res => res.json())
      .then(post => {
        const postsCopy = [...this.state.post];
        postsCopy[index] = post;
        // this.setState({
        //   postsCopy
        // });
        this.fileInputRef.current.value = null;
        window.location.hash = '';
        this.props.getPosts(postsCopy);
      })
      .catch(err => console.error(err));
  }

  render() {
    const imgPreview = this.state.imagePreview;
    // console.log('this.props.editingPost:', this.props.post);
    return (
      <div className='container'>
        <form id='create-photo' onSubmit={this.handleEdit}>
          <div className='post-w'>
            <div className='wrapper row d-flex'>
              <div className='col-md-6'>
                <div className='img-upload'>
                  <img className='image-preview' src={imgPreview} onClick={event => {
                    event.preventDefault();
                    this.fileInputRef.current.click();
                  }}/>
                  <input
                  required
                  style={{ display: 'none' }}
                  className='file-input'
                  type='file'
                  name='image'
                  ref={this.fileInputRef}
                  onChange={this.handleImage}
                  accept='.png, .jpg, .jpeg, .gif' />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='user'>
                  <div className='col-2'>
                    <p>catnip_13</p>
                  </div>
                </div>
                <ViewComments />
                <TimeCreated />
                <textarea
                id="photo-cap"
                name="photo-cap"
                rows="4"
                cols="50"
                placeholder='Write a caption...'
                value={this.state.caption}
                onChange={this.handleCaptionChange}
                required />
                <button type="submit" className="btn btn-info mt-2">Post</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
