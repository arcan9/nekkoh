import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.setQuery = this.setQuery.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  setQuery(event) {
    this.setState({ query: event.target.value });
  }

  async getUsers(event) {
    event.preventDefault();

    try {
      const response = await fetch(`/api/appUsers/?q=${this.state.query}`);
      const user = await response.json();
      window.location.hash = `search?q=${this.state.query}`;
      this.props.searchedUser(user);

      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
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
            <button className='search-btn' type='submit'>
              <i className="fas fa-search"/>
            </button>
          </span>
        </div>
      </form>
    );
  }
}
