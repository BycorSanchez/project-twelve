import './Clock.css'
import React from 'react'

const Clock = () => (
    <div className="clock">
        <span className="line hours" />
        <span className="line minutes" />
        <span className="clock-center" />
    </div>
);

export default Clock