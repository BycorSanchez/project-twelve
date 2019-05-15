import styles from "../styles/FrontLoader.module.css";
import React, { Component } from 'react';
import PropTypes from "prop-types";
import imagesIcon from "../images/images.svg";
import passportIcon from "../images/passport.svg";
import suitcaseIcon from "../images/suitcase.svg";
import boardingPassIcon from "../images/boardingpass.svg";
import { CSSTransition } from "react-transition-group";

const data = [
    {
        image: imagesIcon,
        color: "#f3c97c",
        message: "Loading images"
    },
    {
        image: passportIcon,
        color: "#66ca66",
        message: "Looking for passports"
    },
   {
        image: suitcaseIcon,
        color: "#7eb4e0",
        message: "Packing the suitcase"
    },
   {
        image: boardingPassIcon,
        color: "#a76ad2",
        message: "Printing boarding passes"
   }
];

class FrontLoader extends Component {

    static props = {
        display: PropTypes.bool
    }

    static defaultProps = {
        display: true
    }

    state = {
        current: 0
    }

    _updateMessage = () => {
        const current = (this.state.current + 1) % data.length;
        this.setState({ current });
    }

    componentDidMount(){
        this.interval = setInterval(this._updateMessage, 1500);
    }

    componentDidUpdate(){
        if (!this.props.display && this.interval){
            clearInterval(this.interval);
        }
    }

    componentWillUnmount(){
        if (this.interval) clearInterval(this.interval);
    }

    render(){
        const info = data[this.state.current];

        return (
            <CSSTransition
                in={this.props.display}
                classNames={{
                    enter: styles.frontLoaderEnter,
                    exit: styles.frontLoaderExit,
                    exitDone: styles.frontLoaderExitDone
                }}
                timeout={300}
                unmountOnExit
            >
                <div className={styles.background}>
                    
                    <div className={styles.container}>
                        <h1 className={styles.message}>Welcome! Wait a sec, we are..</h1>
                        <div className={styles.circle} style={{
                            background: info.color
                        }}>
                            <img src={info.image} alt="preloader"/>
                        </div>
                        <h2 className={styles.message}>{info.message}</h2>
                    </div>
                    
                </div>
            </CSSTransition>
        );
    }
}

export default FrontLoader;