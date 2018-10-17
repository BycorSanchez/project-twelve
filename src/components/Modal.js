import './Modal.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import spinner from '../images/spinner.svg'
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

    static _spinner = (<img className="loading-spinner" src={spinner} alt="Loading" />);

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

    _handleKey(keyCode) {
        switch (keyCode) {
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

    _renderControls() {
        const { close, next, previous, showNext, showPrevious } = this.props;
        return (
            <div>
                <button className="icon close" onClick={close}>×</button>
                {
                    showPrevious &&
                    (<button className="icon previous" onClick={previous}>＜</button>)
                }
                {
                    showNext &&
                    (<button className="icon next" onClick={next}>＞</button>)
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
                className="modal"
                tabIndex="1"
                ref={this.modalRef}
                onKeyDown={e => this._handleKey(e.keyCode)}
            >
                <div className="modal-content">
                    {
                        loaded ? this._renderControls() : Modal._spinner
                    }
                    {
                        error &&
                        (<img src={placeholder} alt="Not loaded" />)
                    }
                    <img
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