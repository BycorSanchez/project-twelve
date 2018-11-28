import React, { Component } from "react";
import PropTypes from "prop-types";
import { Howl, Howler } from "howler";
import muted from "../images/volume-mute.svg";
import high from "../images/volume-high.svg";
import styles from "../styles/Player.module.css";

class Player extends Component {
  static propTypes = {
    src: PropTypes.arrayOf(String).isRequired,
    loop: PropTypes.bool
  };

  state = {
    volume: 0
  };

  componentDidMount() {
    this.song = new Howl({
      src: this.props.src,
      loop: this.props.loop || false
    });
  }

  changeVolume = () => {
    const volume = (this.state.volume + 0.5) % 1;

    if (volume) this.song.play();
    else this.song.pause();

    Howler.volume(volume);
    this.setState({ volume });
  };

  _volumeIcon = volume => (volume < 0.5 ? muted : high);

  render() {
    return (
      <img
        id={styles.player}
        src={this._volumeIcon(this.state.volume)}
        alt="Player"
        onClick={this.changeVolume}
      />
    );
  }
}

export default Player;
