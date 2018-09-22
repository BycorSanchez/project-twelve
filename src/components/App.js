import '../css/App.css';
import React, { Component } from 'react';
import Slice from './Slice';
import Rotable from './RotableText';
import dataList from '../data/front-data.json';


class App extends Component {

  state = {
    dataList: []
  }

  componentDidMount() {
    this.setState({ dataList });
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
              data={data}
              width={width}
            />
          ))
        }
      </div>
    );
  }
}

export default App;