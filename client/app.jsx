import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import UserPost from './components/post';
import CreatePost from './pages/create-post';
import Spinner from './components/spinner';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      post: [],
      searchedUser: [],
      isEditing: false,
      isLoading: true,
      isOffline: false
    };
    this.updatePosts = this.updatePosts.bind(this);
    this.editingStatus = this.editingStatus.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({
        route
      });
    });
    window.addEventListener('offline', event => {
      this.setState({
        isOffline: true
      });
    });
    this.updatePosts();
    // this.handleSearch();
  }

  handleSearch(user) {
    this.setState({ searchedUser: user });
    // localStorage.setItem('')
  }

  updatePosts(update) {
    fetch('/api/posts/')
      .then(res => res.json())
      .then(update => this.setState({
        post: update,
        isLoading: false,
        isOffline: false
      }))
      .catch(err => console.error(err));
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  editingStatus() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  renderPage() {
    if (this.state.isLoading) {
      return (
        <Spinner />
      );
    }

    if (this.state.isOffline) {
      return (
        <div className='d-flex justify-content-center mt-2 text-center'>
          Error connecting to network. Please check your internet connection.
        </div>
      );
    }

    const { route } = this.state;
    const postId = route.params.get('postId');
    const query = route.params.get('q');
    console.log(query);
    if (route.path === '') {
      return (
        <div className='container'>
          <div className='row'>
            <UserPost post={this.state.post}
          editing={false}/>
          </div>
        </div>
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
        editing={true}/>
      );
    }
    if (route.path === 'search') {
      return (
        <div className='container'>
          <div className='row'>
            <UserPost post={this.state.searchedUser}
          editing={false}
          queryValue={query} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <Home editing={false}
        searchedUser={this.handleSearch}/>
        {this.renderPage()}
      </>
    );
  }
}
