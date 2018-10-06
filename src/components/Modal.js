import './Modal.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

    render() {
        const { image, close, next, previous, showNext, showPrevious } = this.props;

        return (
            <div
                className="modal"
                tabIndex="0"
                ref={this.modalRef}
                onKeyDown={e => this._handleKey(e.keyCode)}
            >
                <div className="modal-content">
                    <img src={image} alt="" />
                    <span className="icon close" onClick={close}>×</span>
                    {
                        showPrevious &&
                        (<span className="icon previous" onClick={previous}>＜</span>)
                    }
                    {
                        showNext &&
                        (<span className="icon next" onClick={next}>＞</span>)
                    }
                </div>
            </div>
        );
    }
}

export default Modal