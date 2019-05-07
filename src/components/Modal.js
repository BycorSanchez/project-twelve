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

  render() {
    const { loaded, error } = this.state;
    const { photo, close, next, previous, showNext, showPrevious } = this.props;

    return (
      <div
        className={styles.modal}
        tabIndex="1"
        ref={this.modalRef}
        onKeyDown={this._handleKey}
      >
        <div className={styles.content}>
          {!loaded && this._renderSpinner()}

          {error && (
            <img
              className={styles.photo}
              src={placeholder}
              alt="Default"
            />
          )}

          <button
            className={styles.close}
            onClick={close}
            title="Close"
          >&times;</button>

          <div className={styles.container}>
            {showPrevious && (
              <button
                className={styles.control}
                onClick={previous}
                title="Previous"
              >&#10094;</button>
            )}
            <img
              className={styles.photo}
              src={photo}
              alt=""
              onLoad={this._photoLoaded}
              onError={this._photoLoadError}
            />
            {showNext && (
              <button
                className={styles.control}
                onClick={next}
                title="Next"
              >&#10095;</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;