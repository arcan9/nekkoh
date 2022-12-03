import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchedUser: []
    };
    this.setQuery = this.setQuery.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  setQuery(event) {
    this.setState({ query: event.target.value });
  }

  getUsers(event) {
    event.preventDefault();
    // console.log('search btn clicked');
    fetch(`/api/appUsers/?q=${this.state.query.toLowerCase()}`)
      .then(res => res.json())
      .then(user => this.setState({
        searchedUser: user
      }));
  }

  render() {
    console.log(this.state.query);
    return (
      <form onSubmit={this.getUsers}>
        <div className="input-group rounded search-input">
          <input type="search"
        className="form-control rounded"
        placeholder="Search for user"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={this.setQuery}/>
          <span className="input-group-text border-0" id="search-addon">
            <button type='submit'><i className="fas fa-search" /></button>
          </span>
        </div>
      </form>
    );
  }
}
