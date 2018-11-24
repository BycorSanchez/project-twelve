import styles from "../styles/Gallery.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "../helper";
import { lazyLoadConfig, lazyLoadImage } from "../helper";
import Loading from "../components/Loading";

class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    columns: PropTypes.number.isRequired,
    click: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.imgTags = [];
    this.observer = new window.IntersectionObserver(
      lazyLoadImage,
      lazyLoadConfig
    );
  }

  componentDidUpdate() {
    if (this.imgTags.length > 0) {
      this.imgTags.forEach(i => this.observer.observe(i));
    }
  }

  _mapColumn = column => {
    const { columns, images, click } = this.props;
    const indexes = range(column, images.length, columns);
    const width = 100 / columns;

    return (
      <div
        key={column}
        className={styles.column}
        style={{ width: "calc( " + width + "% - 10px )" }}
      >
        {indexes.map(i => (
          <img
            key={i}
            className={styles.galleryImage}
            src={require("../images/placeholder.png")}
            data-src={images[i]}
            alt=""
            onClick={() => click(i)}
            ref={ref => (this.imgTags[i] = ref)}
          />
        ))}
      </div>
    );
  };

  _imagesOf(column) {
    const { columns, images } = this.props;
    return images.filter((i, index) => index % columns === column);
  }

  _hasImages() {
    return this.props.images && this.props.images.length > 0;
  }

  render() {
    return (
      <section id="gallery" className={styles.gallery}>
        {this._hasImages() &&
          [...Array(this.props.columns).keys()].map(this._mapColumn)}

        {!this._hasImages() && (
          <span className={styles.loadingCube}>
            <Loading type="cubes" />
          </span>
        )}
      </section>
    );
  }
}

export default Gallery;
