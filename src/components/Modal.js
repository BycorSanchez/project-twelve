import styles from "../styles/Modal.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import placeholder from "../images/placeholder.png";

class Modal extends Component {
  static propTypes = {
    photo: PropTypes.string.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    showNext: PropTypes.bool,
    showPrevious: PropTypes.bool
  };

  static defaultProps = {
    showNext: true,
    showPrevious: true
  };

  state = {
    loaded: false,
    error: false
  };

  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.modalRef.current.focus();
  }

  _photoLoaded = () => this.setState({ loaded: true });

  _photoLoadError = () => {
    this.setState({ loaded: true, error: true });
    console.error("Photo could not be loaded");
  };

  _handleKey = e => {
    e.preventDefault();
    switch (e.keyCode) {
      case 27: //Escape
        this.props.close();
        break;
      case 37: //Left arrow
        this.props.previous();
        break;
      case 39: //Right arrow
        this.props.next();
        break;
      default:
        break;
    }
  };

  _renderSpinner() {
    return (
      <span className={styles.loading}>
        <Loading type="spinner" />
      </span>
    );
  }

  _renderControls() {
    const { close, next, previous, showNext, showPrevious } = this.props;
    return (
      <div>
        <button
          className={[styles.icon, styles.close].join(" ")}
          onClick={close}
        >
          ×
        </button>
        {showPrevious && (
          <button
            className={[styles.icon, styles.previous].join(" ")}
            onClick={previous}
          >
            ＜
          </button>
        )}
        {showNext && (
          <button
            className={[styles.icon, styles.next].join(" ")}
            onClick={next}
          >
            ＞
          </button>
        )}
      </div>
    );
  }

  render() {
    const { loaded, error } = this.state;
    const { photo } = this.props;

    return (
      <div
        className={styles.modal}
        tabIndex="1"
        ref={this.modalRef}
        onKeyDown={this._handleKey}
      >
        <div className={styles.content}>
          {loaded ? this._renderControls() : this._renderSpinner()}
          {error && (
            <img
              className={styles.photo}
              src={placeholder}
              alt="Default image"
            />
          )}
          <img
            className={styles.photo}
            src={photo}
            alt=""
            onLoad={this._photoLoaded}
            onError={this._photoLoadError}
          />
        </div>
      </div>
    );
  }
}

export default Modal;