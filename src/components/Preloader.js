import styles from "../styles/Preloader.module.css";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Preloader extends Component {

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.string).isRequired,
        period: PropTypes.number
    }

    static defaultProps = {
        period: 2000
    }

    state = {
        current: 0
    }

    _updateMessage = () => {
        const max = this.props.messages.length;
        var current = Math.floor(Math.random() * max);
        this.setState({ current });
    }

    componentDidMount(){
        this.interval = setInterval(this._updateMessage, this.props.period);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const { current } = this.state;
        const { messages } = this.props;

        return (
        <div className={styles.background}>
            <span className={styles.message}>{ messages[current] }</span>
        </div>
        );
    }
}

export default Preloader;