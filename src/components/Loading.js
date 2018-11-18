import React from "react";
import PropTypes from "prop-types";

import spinner from "../images/loadingspinner.svg";
import cubes from "../images/loadingcubes.svg";

const Loading = props => {
    switch (props.type) {
        case "spinner":
            return <img src={spinner} alt="Loading" />;
        case "cubes":
            return <img src={cubes} alt="Loading" />;
        default:
    }
};

Loading.protoTypes = {
    type: PropTypes.oneOf(["spinner", "cubes"]).isRequired
};

export default Loading;
