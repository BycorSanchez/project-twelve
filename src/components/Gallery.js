import styles from "../styles/Gallery.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import Modal from "./Modal";
import { range, lazyLoadConfig, lazyLoadImage } from "../helper";
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

  _photoUrl = (index, columns = 1) => {
    const { photos, deviceWidth } = this.props;
    const format = this._imageFormat(deviceWidth / columns);
    return photos[index].src[format];
  }

  _imageFormat = width => {
    if (width < 190) return "small";
    if (width < 600) return "medium";
    if (width < 950) return "large";
    else return "large2x";
  }

  _renderColumn = column => {
    const { photos, columns } = this.props;
    const indexes = range(column, photos.length, columns);
    const width = 100 / columns;

    return (
      <div
        key={column}
        className={styles.column}
        style={{ width: "calc( " + width + "% - 10px )" }}
      >
        {indexes.map(key => (
          <img
            key={key}
            className={styles.photo}
            src={placeholder}
            data-src={this._photoUrl(key, columns)}
            alt={photos[key].photographer + " photo"}
            onClick={() => this._openModal(key)}
            ref={ref => (this.imageRefs[key] = ref)}
          />
        ))}
      </div>
    );
  };

  render() {
    const { photos, columns, deviceWidth } = this.props;
    const { modal } = this.state;
    
    const hasPhotos = photos && photos.length > 0;
    const anyModal = modal !== undefined;

    return (
      <section id="gallery" className={styles.gallery}>
        {hasPhotos && [...Array(columns).keys()].map(this._renderColumn)}

        {!hasPhotos && (
          <span className={styles.loading}>
            <Loading type="cubes" />
          </span>
        )}

        {anyModal && (
          <Modal
            photos={photos}
            selected={modal}
            imageFormat={this._imageFormat(deviceWidth)}
            onExit={this._closeModal}
          />
        )}
      </section>
    );
  }
}

export default Gallery;
