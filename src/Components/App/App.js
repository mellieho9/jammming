import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import React from 'react';
import { Spotify } from '../../util/spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      SearchResults: [],

      playlistName: "",

      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  addTrack(track){
    if( !this.state.playlistTracks.some(playlistTrack => (playlistTrack.id === track.id)) ) {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks : this.state.playlistTracks});
    }
  }
  removeTrack(track){
    let newPlaylistTracks = this.state.playlistTracks.filter(playlistTrack => (playlistTrack.id !== track.id));
    this.setState({playlistTracks: newPlaylistTracks});
  }
  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }
  async search(term){
    console.log(`You are searching for the song ${term}`);
    let searchResults = await Spotify.search(term);
    this.setState({searchResults: searchResults});
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App" >
          <SearchBar search={this.props.onSearch} />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
  </div>
    );
  }
  
}

export default App;
