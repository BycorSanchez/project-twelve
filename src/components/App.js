import '../css/App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slice from './Slice';


class App extends Component {

  static propTypes = {
    slices: PropTypes.number.isRequired
  }

  state = {
    hoverItem: undefined,
    selected: undefined
  }

  onHover = item => this.setState({ hoverItem: item });
  onClick = item => this.setState({ selected: item });

  isHover = item => this.state.hoverItem === item;

  render() {
    const { slices } = this.props;
    const width = 100 / (slices - 1);

    return (
      <div className="App">
        {
          Array(slices).fill()
            .map((n, i) => (
              <Slice
                key={i}
                item={i}
                width={width}
                isHover={this.isHover(i)}
                onHover={this.onHover}
                onClick={this.onClick}
              />
            ))
        }
      </div>
    );
  }
}

export default App;