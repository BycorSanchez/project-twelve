import styles from "../styles/Modal.module.css";
import React, { Component } from "react";
import AriaModal from 'react-aria-modal';
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

  _photoLoaded = () => this.setState({ loaded: true });

  _photoLoadError = () => {
    this.setState({ loaded: true, error: true });
    console.error("Photo could not be loaded");
  };

  _handleKey = e => {
    switch (e.keyCode) {
      case 37: //Left arrow
        e.preventDefault();
        this.props.previous();
        break;
      case 39: //Right arrow
      e.preventDefault();
        this.props.next();
        break;
      default:
        break;
    }
  };

  render() {
    const { photo, close, next, previous, showNext, showPrevious } = this.props;
    const { loaded, error } = this.state;

    return (
      <div
        className={styles.modal}
        onKeyDown={this._handleKey}
      >
        <AriaModal
          titleText="Image modal"
          onExit={close}
          initialFocus="#close-modal"
          verticallyCenter={true}
        >
          <div className={styles.content}>

            <button
              id="close-modal"
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

              {!loaded && (
                <span className={styles.loading}>
                  <Loading type="spinner" />
                </span>
              )}

              <img
                className={styles.photo}
                src={error? placeholder : photo}
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
        </AriaModal>
      </div>
    );
  }
}

export default Modal;