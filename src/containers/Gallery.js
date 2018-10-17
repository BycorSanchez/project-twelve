import './Gallery.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { range } from '../utils/utils'
import { config, lazyLoadImage } from '../utils/lazyload'

class Gallery extends Component {

    static propTypes = {
        images: PropTypes.array.isRequired,
        columns: PropTypes.number.isRequired,
        click: PropTypes.func.isRequired
    }

    observer = new window.IntersectionObserver(lazyLoadImage, config);

    componentDidMount(){
        // Lazy load all images marked with the class 'lazy'
        const imgs = document.querySelectorAll('.lazy');
        imgs.forEach(i => this.observer.observe(i));
    }

    _mapColumn(column) {
        const { columns, images, click } = this.props;
        const width = (100 / columns);
        const indexes = range(column, images.length, columns);

        return (
            <div
                key={column}
                className="column"
                style={{ width: "calc( " + width + "% - 10px )" }}
            >
                {
                    indexes.map(i => (
                        <img
                            key={i}
                            className="gallery-image lazy"
                            src={require("../images/placeholder.png")}
                            data-src={images[i]}
                            alt=""
                            onClick={() => click(i)}
                        />
                    ))
                }
            </div>
        );
    }

    _imagesOf(column) {
        const { columns, images } = this.props;
        return images.filter((i, index) => (index % columns) === column);
    }

    render() {
        const { columns, images } = this.props;
        return (
            <div id="gallery" className="gallery">
                {
                    images &&
                    images.length > 0 &&
                    Array(columns)
                        .fill()
                        .map((d, column) => this._mapColumn(column))
                }
            </div>
        );
    }
}

export default Gallery