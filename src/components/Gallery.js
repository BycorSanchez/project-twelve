import './Gallery.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sizes from 'react-sizes'

class Gallery extends Component {

    static propTypes = {
        images: PropTypes.array.isRequired
    }

    static sizesToProps({ width }) {
        let columns = 2;
        if (width) {
            columns = (width > 1000) ? 5 : ((width > 700) ? 3 : 2);
        }
        return { columns };
    };

    _mapColumn(column) {
        const width = (100 / this.props.columns);
        const images = this._imagesOf(column);

        return (
            <div
                key={column}
                className="column"
                style={{
                    width: "calc( " + width + "% - 10px )",
                    height: "100%"
                }}
            >
                {
                    images.map((image, index) => this._mapImage(image, index))
                }
            </div>
        );
    }

    _mapImage = (image, index) => (<img key={index} src={image} alt="" />);

    _imagesOf(column) {
        const { columns, images } = this.props;
        return images.filter((i, index) => (index % columns) === column);
    }

    render() {
        const { columns, images } = this.props;
        return (
            <div className="gallery">
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


export default sizes(Gallery.sizesToProps)(Gallery);