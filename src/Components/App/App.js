import './App.css';
import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{ id: '1', name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across the Water'}],
      playlistName: 'My Epic Playlist',
      playlistTracks: [{ id: '2', name: 'Woman', artist: 'Doja Cat', album: 'Planet Her'}, 
      { id: '3', name: 'As It Was', artist: 'Harry Styles', album: 'Harrys House'}]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
   }
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
      console.log(tracks);
    }
  }
  removeTrack(track) {
    let trackID = track.id;
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((trackItem) => trackItem.id !== trackID);
    this.setState({ playlistTracks: tracks })
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  //generates an array of url values from the playlistTrack prop
  savePlaylist() {
    // let trackURIs = this.state.playlistTracks;

  }
  search(searchTerm) {
    console.log(searchTerm);
  }
  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar
          onSearch={this.search}
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
