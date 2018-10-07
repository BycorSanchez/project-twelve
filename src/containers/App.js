import './App.css'
import React, { Component } from 'react'
import Front from './Front'
import Gallery from './Gallery'
import Modal from '../components/Modal'

class App extends Component {

  state = {
    dataList: [],
    selected: undefined,
    modal: undefined
  }

  componentDidMount() {
    fetch("data/front-data.json")
      .then(r => r.json())
      .then(dataList => this.setState({ dataList }))
      .catch(e => console.error("Front page information could not be loaded"));
  }

  _onSelect = item => this.setState({ selected: item });

  _openModal = modal => {
    const length = this.state.dataList.length;

    if (modal > -1 && modal < length) {
      this.setState({ modal })
    }
  }

  _anySelected = () => this.state.selected !== undefined;

  _anyModal = () => this.state.modal !== undefined;

  _closeModal = () => this.setState({ modal: undefined });

  render() {
    const { dataList, selected, modal } = this.state;

    return (
      <div className="App">
        <main>
          <Front
            dataList={dataList}
            selected={selected}
            onSelect={this._onSelect}
          />

          {
            this._anySelected() &&
            (
              <Gallery
                images={dataList.map(d => d.url)}
                click={this._openModal}
              />
            )
          }

          {
            this._anyModal() &&
            (
              <Modal
                image={dataList[modal].url}
                close={this._closeModal}
                next={() => this._openModal(modal + 1)}
                previous={() => this._openModal(modal - 1)}
                showPrevious={modal > 0}
                showNext={modal < (dataList.length - 1)}
              />
            )
          }
        </main>
        {
          this._anySelected() &&
          (
            <footer>
              <p>With <span className="heart">♥</span> by <a href="https://github.com/BycorSanchez">Bycor</a></p>
            </footer>
          )
        }
      </div>
    );
  }
}

export default App