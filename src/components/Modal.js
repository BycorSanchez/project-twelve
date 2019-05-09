import styles from "../styles/Modal.module.css";
import React, { Component } from "react";
import AriaModal from 'react-aria-modal';
import PropTypes from "prop-types";
import Loading from "./Loading";
import placeholder from "../images/placeholder.png";

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
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
        this.props.onPrevious();
        break;
      case 39: //Right arrow
      e.preventDefault();
        this.props.onNext();
        break;
      default:
        break;
    }
  };

  render() {
    const { url, photo, onExit, onNext, onPrevious, showNext, showPrevious } = this.props;
    const { loaded, error } = this.state;

    return (
      <div
        className={styles.modal}
        onKeyDown={this._handleKey}
      >
        <AriaModal
          titleText="Modal image"
          onExit={onExit}
          verticallyCenter={true}
          focusDialog={true}
          includeDefaultStyles="width: auto"
        >
          <div className={styles.content}>

            <button
              className={styles.close}
              onClick={onExit}
              title="Close"
            >&times;</button>

            <div className={styles.container}>
              {showPrevious && (
                <button
                  className={styles.control}
                  onClick={onPrevious}
                  title="Previous"
                >&#10094;</button>
              )}

              {!loaded && (
                <span className={styles.loading}>
                  <Loading type="spinner" />
                </span>
              )}

              <figure className={styles.information}>
                <img
                  className={styles.photo}
                  src={error? placeholder : url}
                  alt={error? "Default" : ""}
                  onLoad={this._photoLoaded}
                  onError={this._photoLoadError}
                />  
                <figcaption><p>Photo by <a href={photo.photographer_url}>{photo.photographer}</a> on <a href={photo.url}>Pexels</a></p></figcaption>
              </figure>


              {showNext && (
                <button
                  className={styles.control}
                  onClick={onNext}
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