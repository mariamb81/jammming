import './App.css';
import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Epic Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
   }
   //add a new track to playlistTracks if it does not exist in playlistTracks yet
   addTrack(track) { 
    let trackID = track.id;
    let tracks = this.state.playlistTracks;
    let newTrack = true;
    for(const idx in tracks) {
      if(tracks[idx].id === trackID) {
        newTrack = false;
        break;
      }
    }
    if(newTrack) {
      this.setState({ playlistTracks: [...tracks, track] });
    }
  }
  //filters out the chosen track from playlistTracks
  removeTrack(track) {
    let trackID = track.id;
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((trackItem) => trackItem.id !== trackID);
    this.setState({ playlistTracks: tracks })
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  
  savePlaylist() {
    //generates an array of uri values from playlistTracks
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    //resets the playlist name and clears the playlist
    this.setState({ 
      playlistName: 'New Playlist',
      playlistTracks: []
     })
  }
  async search(searchTerm) {
    let response = await Spotify.search(searchTerm)
    this.setState({ searchResults: response })
  }

  getAccessToken() {
    Spotify.getAccessToken();
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar
          onSearch={this.search}
          onAuthenticate={this.getAccessToken}
          />
          <div className='App-playlist'>
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
            />
            <Playlist 
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
