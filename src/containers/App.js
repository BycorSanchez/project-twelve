import './App.css';
import React, { Component } from 'react';
import Slice from '../components/Slice';
import Rotable from '../components/RotableText';

class App extends Component {

  state = {
    dataList: []
  }

  componentDidMount() {
    fetch("data/front-data.json")
      .then(r => r.json())
      .then(dataList => this.setState({ dataList }))
      .catch(e => console.error("Front page information could not be loaded"));
  }

  render() {
    const { dataList } = this.state;
    const width = 100 / (dataList.length - 1);

    return (
      <div className="App">
        <header>
          <h1>
            <Rotable text="Memories of" options={["a lifetime", "a love story", "us"]} />
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
            />
          ))
        }
      </div>
    );
  }
}

export default App;