import './Gallery.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sizes from 'react-sizes'
import { range } from '../utils/Utils'

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

    _anyModal() {
        return this.state.modalImage !== undefined;
    }

    _mapColumn(column) {
        const { columns, images } = this.props;
        const width = (100 / columns);
        const indexes = range(column, images.length, columns);

        return (
            <div
                key={column}
                className="column"
                style={{
                    width: "calc( " + width + "% - 10px )"
                }}
            >
                {
                    indexes.map(i => this._mapImage(i))
                }
            </div>
        );
    }

    _mapImage(index) {
        const image = this.props.images[index];
        return (
            <img
                key={index}
                className="gallery-image"
                src={image}
                alt=""
                onClick={() => this._openModal(index)}
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
                    this._anyModal() &&
                    (
                        <div className="modal" onClick={e => this._modalClicked(e)}>
                            <div className="modal-content">
                                <img src={images[modalImage]} alt="" />
                                <span className="icon close" onClick={() => this._closeModal()}>×</span>
                                {
                                    modalImage > 0 &&
                                    (<span className="icon previous" onClick={() => this._openModal(modalImage - 1)}>＜</span>)
                                }
                                {
                                    modalImage < (images.length - 1) &&
                                    (<span className="icon next" onClick={() => this._openModal(modalImage + 1)}>＞</span>)
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default sizes(Gallery.sizesToProps)(Gallery)