import '../css/App.css';
import React, { Component } from 'react';
import Slice from './Slice';
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