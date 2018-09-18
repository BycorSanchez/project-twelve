import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {

  state = { hoverItem: undefined }

  sliceStyle = (i, width, increment = 0) => {
    const x1 = i * width;
    const x2 = (i + 1) * width;
    const x3 = (i - 1) * width;
    return ({ "clipPath": "polygon(" + (x1 - increment) + "% 0," + (x2 + increment) + "% 0," + (x1 + increment) + "% 100%, " + (x3 - increment) + "% 100%)" });
  }

  onHover = hoverItem => this.setState({ hoverItem });

  render() {
    const { hoverItem } = this.state;
    const slices = 12;
    const width = 100 / (slices - 1);

    return (
      <div className="App">
        {
          Array(slices)
            .fill()
            .map((n, i) => {
              const increment = (hoverItem === i) ? (width / 4) : 0;
              const sliceClass = "shape" + ((hoverItem === i) ? " shape-hover" : "");

              return (
                <div
                  key={i}
                  className={sliceClass}
                  style={this.sliceStyle(i, width, increment)}
                  onMouseEnter={() => this.onHover(i)}
                />
              )
            })
        }
      </div>
    );
  }
}

export default App;