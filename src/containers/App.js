import './App.css';
import React, { Component } from 'react';
import Slice from '../components/Slice';
import Rotable from '../components/RotableText';

class App extends Component {

  state = {
    dataList: [],
    hover: undefined
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

  render() {
    const { dataList, hover } = this.state;
    const width = 100 / (dataList.length - 1);

    return (
      <div className="App">
        <header>
          <h1>
            <Rotable text="Memories of" mode="manual" options={dataList.map(d => d.title)} start={hover} />
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
            />
          ))
        }
      </div>
    );
  }
}

export default App;