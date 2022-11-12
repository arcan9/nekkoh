import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import UserPost from './components/post';
import CreatePost from './pages/create-post';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      post: []
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({
        route
      });
    });
    fetch('/api/posts')
      .then(res => res.json())
      .then(post => this.setState({
        post
      }));
  }

  getPosts() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(post => this.setState({
        post
      }));
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <UserPost post={this.state.post}/>
      );
    }
    if (route.path === 'createpost') {
      return (
        <CreatePost getPosts={this.getPosts}/>
      );
    }
  }

  render() {
    return (
      <>
        <Home />
        {this.renderPage()}
      </>
    );
  }
}
