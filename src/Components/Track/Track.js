import React, { Component } from 'react'
import './Track.css'
import ReactAudioPlayer from 'react-audio-player';

export default class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack() {
   this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  render() {
    let isRemoval = this.props.isRemoval; //change me!
    const track = this.props.track;
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {track["preview_url"] ? 
        <div>
        <ReactAudioPlayer
          src={track["preview_url"]}
          className="AudioPreview"
          controls
        />
        </div>
        :
        <div>
        </div>
        }

        <button 
          className='Track-action'
          onClick={ isRemoval ? this.removeTrack : this.addTrack }
          >{ isRemoval ? '-' : '+'}</button>
      </div>
    )
  }
}
