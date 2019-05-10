import styles from "../styles/Gallery.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import Modal from "./Modal";
import { range, lazyLoadConfig, lazyLoadImage, photoUrl } from "../helper";
import placeholder from "../images/placeholder.png";

class Gallery extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    columns: PropTypes.number.isRequired,
    deviceWidth: PropTypes.number.isRequired
  };

  state = {
    modal: undefined
  };

  constructor() {
    super();
    this.imageRefs = [];
    this.observer = new IntersectionObserver(lazyLoadImage,lazyLoadConfig);
  }

  componentDidMount() {
    this.imageRefs.forEach(i => this.observer.observe(i));
  }

  _openModal = modal => this.setState({ modal });

  _closeModal = () => this.setState({ modal: undefined });

  _renderColumn = column => {
    const { photos, columns, deviceWidth } = this.props;
    const widthPercent = 100 / columns;
    const width = deviceWidth / columns;

    //Get photo indexes for this column
    const indexes = range(column, photos.length, columns);

    return (
      <div
        key={column}
        className={styles.column}
        style={{ width: "calc( " + widthPercent + "% - 10px )" }}
      >
        {indexes.map(index => (
          <img
            key={index}
            src={placeholder}
            data-src={photoUrl(photos[index], width)}
            alt={photos[index].photographer + " photo"}
            onClick={() => this._openModal(index)}
            ref={ref => (this.imageRefs[index] = ref)}
            className={styles.photo}
          />
        ))}
      </div>
    );
  };

  render() {
    const { photos, columns, deviceWidth } = this.props;
    const { modal } = this.state;
    
    const hasPhotos = photos && photos.length > 0;
    const hasModal = modal !== undefined;

    return (
      <section id="gallery" className={styles.gallery}>
        {hasPhotos && [...Array(columns).keys()].map(this._renderColumn)}

        {!hasPhotos && (
          <span className={styles.loading}>
            <Loading type="cubes" />
          </span>
        )}

        {hasModal && (
          <Modal
            photos={photos}
            selected={modal}
            onExit={this._closeModal}
            width={deviceWidth}
          />
        )}
      </section>
    );
  }
}

export default Gallery;
