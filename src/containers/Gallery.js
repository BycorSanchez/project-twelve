import styles from "../styles/Gallery.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "../helper";
import { config, lazyLoadImage } from "../lazyload";

class Gallery extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired,
        columns: PropTypes.number.isRequired,
        click: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.imgTags = [];
        this.observer = new window.IntersectionObserver(lazyLoadImage, config);
    }

    componentDidMount() {
        // Lazy load gallery images
        this.imgTags.forEach(i => this.observer.observe(i));
    }

    _mapColumn = column => {
        const { columns, images, click } = this.props;
        const indexes = range(column, images.length, columns);

        return (
            <div
                key={column}
                className={styles.column}
                style={{ width: `calc( " + ${100 / columns} + "% - 10px )` }}
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

    render() {
        const { columns, images } = this.props;
        return (
            <section id="gallery" className={styles.gallery}>
                {images &&
                    images.length > 0 &&
                    [...Array(columns).keys()].map(this._mapColumn)}
            </section>
        );
    }
}

export default Gallery;
