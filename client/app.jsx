import React from 'react';
// import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Navigation from './components/navigation';
import UserPost from './components/post';
import CreatePost from './pages/create-post';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({
        route
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <UserPost />
      );
    }
    if (route.path === 'createpost') {
      return (
        <CreatePost />
      );
    }
  }

  render() {
    return (
      <>
        <Navigation />
        {this.renderPage()}
      </>
    );
  }
}
