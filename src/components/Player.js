import React, { Component } from "react";
import PropTypes from "prop-types";
import { Howl } from "howler";
import muted from "../images/volume-mute.svg";
import high from "../images/volume-high.svg";
import styles from "../styles/Player.module.css";

class Player extends Component {
  static propTypes = {
    songs: PropTypes.arrayOf(String).isRequired
  };

  state = {
    playing: true
  };

  componentDidMount() {
    this.createSong(0);
  }

  createSong(current) {
    const { songs, loop } = this.props;
    this.song = new Howl({
      src: songs[current],
      loop: loop || false,
      onend: () => this.createSong((current + 1) % songs.length)
    });
    this.song.play();
  }

  changeVolume = () => {
    if (this.state.playing) this.song.pause();
    else this.song.play();
    this.setState(state => ({ playing: !state.playing }));
  };

  render() {
    return (
      <img
        id={styles.player}
        src={this.state.playing ? high : muted}
        alt="Player"
        onClick={this.changeVolume}
      />
    );
  }
}

export default Player;
