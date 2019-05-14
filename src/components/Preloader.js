import styles from "../styles/Preloader.module.css";
import React, { Component } from 'react';
import imagesIcon from "../images/images.svg";
import passportIcon from "../images/passport.svg";
import suitcaseIcon from "../images/suitcase.svg";
import boardingPassIcon from "../images/boardingpass.svg";

const data = [
    {
        image: imagesIcon,
        color: "wheat",
        message: "Loading images"
    },
    {
        image: passportIcon,
        color: "white",
        message: "Looking for passports"
    },
   {
        image: boardingPassIcon,
        color: "green",
        message: "Printing boarding passes"
   },
   {
        image: suitcaseIcon,
        color: "brown",
        message: "Packing the suitcase"
   } 
];

class Preloader extends Component {

    state = {
        current: 0
    }

    _updateMessage = () => {
        const current = (this.state.current + 1) % data.length;
        this.setState({ current });
    }

    componentDidMount(){
        this.interval = setInterval(this._updateMessage, 3000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const info = data[this.state.current];

        return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.circle} style={{
                    background: info.color
                }}>
                    <img src={info.image} alt="preloader"/>
                </div>
                <span className={styles.message}>{info.message}</span>    
            </div>
            
        </div>
        );
    }
}

export default Preloader;