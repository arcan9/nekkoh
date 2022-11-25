import React from 'react';
import Modal from '../components/modal';

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      imagePreview: 'https://raw.githubusercontent.com/arcan9/code-journal/main/images/placeholder-image-square.jpg',
      modal: false
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {

    if (this.props.editing === false) {
      return;
    }

    const currentUserPosts = this.props.post;
    const editingPostId = this.props.postId;

    let index = 0;
    // Find the index of the post with the matching postId in the state array.
    for (let i = 0; i < currentUserPosts.length; i++) {
      if (currentUserPosts[i].postId === editingPostId) {
        index = i;
      }
    }

    fetch(`/api/posts/${editingPostId}`)
      .then(res => res.json())
      .then(post => {
        const postsCopy = this.props.post.slice();
        postsCopy[index] = post;
        this.setState({
          caption: postsCopy[index].caption,
          imagePreview: postsCopy[index].mediaFile
        });
        this.fileInputRef.current.value = null;
        this.props.updatePosts(postsCopy);
      });

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
      .then(posts => {
        this.setState({
          caption: ''
        });
        this.fileInputRef.current.value = null;
        window.location.hash = '';
        this.props.updatePosts();
      })
      .catch(err => console.error(err));

  }

  handleEdit(event) {
    event.preventDefault();

    let index = 0;

    const currentUserPosts = this.props.post;
    const editingPostId = this.props.postId;

    // Find the index of the post with the matching postId in the state array.
    for (let i = 0; i < currentUserPosts.length; i++) {
      if (currentUserPosts[i].postId === editingPostId) {
        index = i;
      }
    }

    const formData = new FormData();

    formData.append('caption', this.state.caption);
    formData.append('image', this.fileInputRef.current.files[0]);

    const userPostObj = {
      method: 'PATCH',
      body: formData
    };

    fetch(`/api/posts/${editingPostId}`, userPostObj)
      .then(res => res.json())
      .then(post => {
        const postsCopy = this.props.post.slice();
        postsCopy[index] = post;
        this.fileInputRef.current.value = null;
        window.location.hash = '';
        this.props.updatePosts(postsCopy);
      })
      .catch(err => console.error(err));
  }

  handleDelete() {
    let index = 0;

    const currentUserPosts = this.props.post;
    const editingPostId = this.props.postId;

    // Find the index of the post with the matching postId in the state array.
    for (let i = 0; i < currentUserPosts.length; i++) {
      if (currentUserPosts[i].postId === editingPostId) {
        index = i;
      }
    }
    const deletePostObj = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`/api/posts/${editingPostId}`, deletePostObj)
      .then(post => {
        const postsCopy = this.props.post.slice();
        postsCopy[index] = post;
        this.fileInputRef.current.value = null;
        window.location.hash = '';
        this.props.updatePosts(postsCopy);
      })
      .catch(err => console.error(err));
  }

  showModal() {
    this.setState({
      modal: true
    });
  }

  hideModal() {
    this.setState({
      modal: false
    });
  }

  render() {
    const imgPreview = this.state.imagePreview;
    const caption = this.state.caption;
    let onSubmitBehavior = null;
    let deleteText = null;
    let buttonText = '';
    let modal = null;
    let requiredStatus = false;

    if (this.props.editing === true) {
      buttonText = 'Edit';
      deleteText = 'Delete';
      onSubmitBehavior = this.handleEdit;
    } else if (this.props.editing === false) {
      buttonText = 'New Post';
      requiredStatus = true;
      onSubmitBehavior = this.handleSubmit;
    }

    if (this.state.modal === true) {
      modal = <Modal
        modal={this.state.modal}
        post={this.props.post}
        postId={this.props.postId}
        hide={this.hideModal}
        delete={this.handleDelete}/>;
    }

    return (
      <>
        {modal}
        <div className='container'>
          <form id='create-photo' onSubmit={ onSubmitBehavior }>
            <div className='post-w'>
              <div className='wrapper row d-flex'>
                <div className='flex-column-reverse'>
                  <div className='img-upload'>
                    <img className='image-preview' src={imgPreview} onClick={event => {
                      event.preventDefault();
                      this.fileInputRef.current.click();
                    }}/>
                    <input
                      required={requiredStatus}
                      style={{ display: 'none' }}
                      className='file-input'
                      type='file'
                      name='image'
                      ref={this.fileInputRef}
                      onChange={this.handleImage}
                      accept='.png, .jpg, .jpeg, .gif' />
                  </div>
                </div>
                <div className='flex-column-reverse'>
                  <textarea
                    id="photo-cap"
                    name="photo-cap"
                    rows="4"
                    cols="50"
                    placeholder='Write a caption...'
                    value={caption}
                    onChange={this.handleCaptionChange}
                    required />
                  <div className='d-flex justify-content-between'>
                    {/* <div className='col-md-6'>
                    </div> */}
                    <a onClick={this.showModal} className='delete'>{deleteText}</a>
                    <button type="submit" className="btn btn-info mt-2">{buttonText}</button>
                    {/* <div className='col-md-6'>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
