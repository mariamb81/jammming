import React, { Component } from 'react';
import './SearchBar.css'
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      isAuthenticated: false,
    }
  }
  search(term) {
    if(this.state.isAuthenticated){
      this.props.onSearch(this.state.term);
    }
    else{
      alert('Authenticate with Spotify to search for songs!')
    }
  }
  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }
  authenticate() {
    this.props.onAuthenticate();
    this.setState({
      isAuthenticated: true,
    });
  }
  
  render() {
    let isAuthenticated = this.state.isAuthenticated;
    let msgLocked = 'Authenticate below to search!';
    let msgUnlocked = 'Enter A Song, Album, or Artist';
    return (
      <div className='SearchBar'>
        <input 
        placeholder={`${!isAuthenticated ? msgLocked : msgUnlocked}`}
        onChange={this.handleTermChange}
        />
        {
        !isAuthenticated ?
        <div>
          <button
         className='AuthenticateButton'
         onClick={this.authenticate}
         >Authenticate with Spotify</button>
         </div>
         :
         <div>
            <button
            className='SearchButton'
            onClick={this.search}
            >Search</button>
         </div>
        }

      </div>
    );
  }
}
