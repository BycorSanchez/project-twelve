import styles from "../styles/Gallery.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "../helper";
import { lazyLoadConfig, lazyLoadImage } from "../helper";
import Loading from "./Loading";
import Modal from "./Modal";
import placeholder from "../images/placeholder.png";

class Gallery extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    columns: PropTypes.number.isRequired,
    resolution: PropTypes.oneOf(["small", "medium", "large", "large2x", "original"])
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

  _openModal = modal => {
    if (modal > -1 && modal < this.props.photos.length) {
      this.setState({ modal });
    }
  };

  _closeModal = () => this.setState({ modal: undefined });

  _photoUrl = (index) => {
    const { photos, resolution } = this.props;
    return photos[index].src[resolution];
  }

  _mapColumn = column => {
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
            data-src={this._photoUrl([key])}
            alt=""
            onClick={() => this._openModal(key)}
            ref={ref => (this.imageRefs[key] = ref)}
          />
        ))}
      </div>
    );
  };

  render() {
    const { photos, columns } = this.props;
    const { modal } = this.state;

    const hasPhotos = photos && photos.length > 0;
    const anyModal = modal !== undefined;

    return (
      <section id="gallery" className={styles.gallery}>
        {hasPhotos && [...Array(columns).keys()].map(this._mapColumn)}

        {!hasPhotos && (
          <span className={styles.loading}>
            <Loading type="cubes" />
          </span>
        )}

        {anyModal && (
          <Modal
            image={this._photoUrl(modal)}
            close={this._closeModal}
            next={() => this._openModal(modal + 1)}
            previous={() => this._openModal(modal - 1)}
            showPrevious={modal > 0}
            showNext={modal < photos.length - 1}
          />
        )}
      </section>
    );
  }
}

export default Gallery;
