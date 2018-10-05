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

    state = {
        modalImage: undefined
    }

    _openModal(modalImage) {
        this.setState({ modalImage });
    }

    _closeModal() {
        this.setState({ modalImage: undefined });
    }

    _modalClicked(e) {
        if (e.target.classList.contains("modal")) {
            this._closeModal();
        }
    }

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

    _mapImage(image, index) {
        return (
            <img
                key={index}
                className="gallery-image"
                src={image}
                alt=""
                onClick={() => this._openModal(image)}
            />);
    }

    _imagesOf(column) {
        const { columns, images } = this.props;
        return images.filter((i, index) => (index % columns) === column);
    }

    render() {
        const { columns, images } = this.props;
        const { modalImage } = this.state;
        return (
            <div className="gallery">
                {
                    images &&
                    images.length > 0 &&
                    Array(columns)
                        .fill()
                        .map((d, column) => this._mapColumn(column))
                }
                {
                    modalImage &&
                    <div className="modal" onClick={e => this._modalClicked(e)}>
                        <div className="modal-content">
                            <span className="icon close" onClick={() => this._closeModal()}>×</span>
                            <img src={modalImage} alt="" />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default sizes(Gallery.sizesToProps)(Gallery)