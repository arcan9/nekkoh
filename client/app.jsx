import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import UserPost from './components/post';
import CreatePost from './pages/create-post';
import Comments from './components/comments';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      post: [],
      isEditing: false
    };
    this.updatePosts = this.updatePosts.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({
        route
      });
    });
    this.updatePosts();
  }

  updatePosts(update) {
    fetch('/api/posts')
      .then(res => res.json())
      .then(update => this.setState({
        post: update
      }));
    this.setState({
      isEditing: false
    });
  }

  handleClick() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  renderPage() {
    const { route } = this.state;
    const postId = this.state.route.params.get('postId');
    if (route.path === '') {
      return (
        <>
          <Comments currentUserId='2'/>
          <UserPost post={this.state.post}
        isEditing={this.handleClick}/>
        </>
      );
    }
    if (route.path === 'createpost') {
      return (
        <CreatePost updatePosts={this.updatePosts}
        editing={false}/>
      );
    }
    if (route.path === 'editpost') {
      return (
        <CreatePost
        post={this.state.post}
        postId={postId}
        updatePosts={this.updatePosts}
        isEditing={this.handleClick}
        editing={true}/>
      );
    }
  }

  render() {
    return (
      <>
        <Home isEditing={() => { this.setState({ isEditing: false }); }}/>
        {this.renderPage()}
      </>
    );
  }
}
