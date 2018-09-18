import '../css/App.css';
import React, { Component } from 'react';
import Slice from './Slice';
import images from '../data/images.json';


class App extends Component {

  state = {
    images: [],
    hoverItem: undefined,
    selected: undefined
  }

  componentDidMount() {
    this.setState({ images })
  }

  onHover = item => this.setState({ hoverItem: item });
  onClick = item => this.setState({ selected: item });
  isHover = item => this.state.hoverItem === item;
  isSelected = item => this.state.selected === item;

  render() {
    const { images } = this.state;
    const width = 100 / (images.length - 1);

    return (
      <div className="App">
        {
          images &&
          images.map((image, index) => (
            <Slice
              key={index}
              item={index}
              image={image}
              width={width}
              isHover={this.isHover(index)}
              isSelected={this.isSelected(index)}
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