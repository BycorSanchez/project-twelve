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

    render() {
        const { image, close, next, previous, showNext, showPrevious } = this.props;

        return (
            <div className="modal">
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