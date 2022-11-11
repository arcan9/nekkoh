import React from 'react';
import ViewComments from '../components/view-comments';
import TimeCreated from '../components/time-created';

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      imageFile: 'https://raw.githubusercontent.com/arcan9/code-journal/main/images/placeholder-image-square.jpg'
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(event) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          imageFile: reader.result
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
        console.log(imgData);
        this.setState({
          caption: ''
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    const imgFile = this.state.imageFile;

    return (
      <div className='container'>
        <form id='create-photo' onSubmit={this.handleSubmit}>
          <div className='post-row'>
            <div className='wrapper'>
              <div className='col-2'>
                <div className='img-upload'>
                  <img src={imgFile} onClick={event => {
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
              <div className='col-2'>
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
                <button type='submit'>Post</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
