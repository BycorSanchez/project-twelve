import styles from './Modal.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

import placeholder from '../images/placeholder.png'

class Modal extends Component {

    static propTypes = {
        image: PropTypes.string.isRequired,
        next: PropTypes.func.isRequired,
        previous: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        showNext: PropTypes.bool,
        showPrevious: PropTypes.bool
    }

    static defaultProps = {
        showNext: true,
        showPrevious: true
    }

    state = {
        loaded: false,
        error: false
    }

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        this.modalRef.current.focus();
    }

    _handleKey(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 27: //Escape
                this.props.close();
                break;
            case 37: //Left arrow
                this.props.previous();
                break;
            case 39: //Right arrow
                this.props.next();
                break;
            default:
                break;
        }
    }

    _renderSpinner() {
        return (<span className={styles.loadingSpinner}><Loading type="spinner" /></span>);
    }

    _renderControls() {
        const { close, next, previous, showNext, showPrevious } = this.props;
        return (
            <div>
                <button className={[styles.icon, styles.close].join(' ')} onClick={close}>×</button>
                {
                    showPrevious &&
                    (<button className={[styles.icon, styles.previous].join(' ')} onClick={previous}>＜</button>)
                }
                {
                    showNext &&
                    (<button className={[styles.icon, styles.next].join(' ')} onClick={next}>＞</button>)
                }
            </div>
        );
    }

    _imageLoaded = () => this.setState({ loaded: true });

    _imageLoadError = () => {
        this.setState({ loaded: true, error: true });
        console.error("Image could not be loaded");
    }

    render() {
        const { loaded, error } = this.state;
        const { image } = this.props;

        return (
            <div
                className={styles.modal}
                tabIndex="1"
                ref={this.modalRef}
                onKeyDown={e => this._handleKey(e)}
            >
                <div className={styles.modalContent}>
                    {loaded ? this._renderControls() : this._renderSpinner()}
                    {
                        error &&
                        (<img className={styles.modalImage} src={placeholder} alt="Not loaded" />)
                    }
                    <img
                        className={styles.modalImage}
                        src={image}
                        alt=""
                        onLoad={this._imageLoaded}
                        onError={this._imageLoadError}
                    />
                </div>
            </div>
        );
    }
}

export default Modal