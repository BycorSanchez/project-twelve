import './App.css';
import React, { Component } from 'react';
import Slice from '../components/Slice';
import Rotable from '../components/RotableText';
import Gallery from '../components/Gallery';

class App extends Component {

  state = {
    dataList: [],
    hover: undefined,
    selected: undefined
  }

  componentDidMount() {
    fetch("data/front-data.json")
      .then(r => r.json())
      .then(dataList => this.setState({ dataList }))
      .catch(e => console.error("Front page information could not be loaded"));
  }

  onHover = item => {
    this.setState({ hover: item });
  }

  onSelect = item => {
    this.setState({ selected: item });
  }

  render() {
    const { dataList, hover, selected } = this.state;
    const width = 100 / (dataList.length - 1);

    return (
      <div className="App">
        <section className="front">
          <header>
            <h1>
              <Rotable text="Memories of" mode="manual" start={hover} options={dataList.map(d => d.title)} />
            </h1>
          </header>

          {
            dataList &&
            dataList.map((data, index) => (
              <Slice
                key={index}
                item={index}
                width={width}
                image={data.url}
                onHover={this.onHover}
                onSelect={this.onSelect}
              />
            ))
          }
        </section>
        {
          selected !== undefined &&
          selected !== null &&
          (
            <section>
              <Gallery images={dataList.map(d => d.url)} />
            </section>
          )
        }
      </div>
    );
  }
}

export default App;