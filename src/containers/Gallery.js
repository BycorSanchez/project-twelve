import styles from "../styles/Gallery.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "../helper";
import { lazyLoadConfig, lazyLoadImage } from "../helper";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    columns: PropTypes.number.isRequired
  };

  state = {
    modal: undefined
  };

  constructor() {
    super();
    this.imgRefs = [];
    this.observer = new window.IntersectionObserver(
      lazyLoadImage,
      lazyLoadConfig
    );
  }

  componentDidUpdate() {
    if (this.imgRefs.length > 0) {
      this.imgRefs.forEach(i => this.observer.observe(i));
    }
  }

  _openModal = modal => {
    if (modal > -1 && modal < this.props.images.length) {
      this.setState({ modal });
    }
  };

  _closeModal = () => this.setState({ modal: undefined });

  _mapColumn = column => {
    const { images, columns } = this.props;
    const indexes = range(column, images.length, columns);
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
            className={styles.galleryImage}
            src={require("../images/placeholder.png")}
            data-src={images[key]}
            alt=""
            onClick={() => this._openModal(key)}
            ref={ref => (this.imgRefs[key] = ref)}
          />
        ))}
      </div>
    );
  };

  _imagesOf(column) {
    const { columns, images } = this.props;
    return images.filter((image, index) => index % columns === column);
  }

  render() {
    const { images, columns } = this.props;
    const { modal } = this.state;

    const hasImages = images && images.length > 0;
    const anyModal = modal !== undefined;

    return (
      <section id="gallery" className={styles.gallery}>
        {hasImages && [...Array(columns).keys()].map(this._mapColumn)}

        {!hasImages && (
          <span className={styles.loadingCube}>
            <Loading type="cubes" />
          </span>
        )}

        {anyModal && (
          <Modal
            image={images[modal]}
            close={this._closeModal}
            next={() => this._openModal(modal + 1)}
            previous={() => this._openModal(modal - 1)}
            showPrevious={modal > 0}
            showNext={modal < images.length - 1}
          />
        )}
      </section>
    );
  }
}

export default Gallery;
