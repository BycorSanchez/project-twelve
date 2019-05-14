import styles from "../styles/Preloader.module.css";
import React, { Component } from 'react';
import icon1 from "../images/iconmonstr.svg";

const data = [
    {
        image: icon1,
        color: "red",
        message: "Loading images"
    },
    {
        image: icon1,
        color: "white",
        message: "Looking for passports"
    },
   {
        image: icon1,
        color: "green",
        message: "Printing boarding passes"
   },
   {
        image: icon1,
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
        this.interval = setInterval(this._updateMessage, 2000);
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