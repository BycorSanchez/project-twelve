import './App.css'
import React, { Component } from 'react'
import Front from './Front'
import Gallery from './Gallery'
import Modal from '../components/Modal'
import sizes from 'react-sizes'
import { fetchFrontData, fetchImages } from '../api'

class App extends Component {

  static sizesToProps({ width }) {
    return { deviceWidth: width };
  }

  state = {
    dataList: [],
    imageList: undefined,
    selected: undefined,
    modal: undefined
  }

  componentDidMount() {
    fetchFrontData()
      .then(dataList => this.setState({ dataList }))
      .catch(e => console.error("Front page information could not be loaded"));
  }

  _onSelect = item => {
    this.setState({ selected: item, imageList: undefined });

    if (item !== undefined) {
      const data = this.state.dataList[item];
      fetchImages(data.title)
        .then(imageList => this.setState({ imageList }))
        .catch(e => console.error("Gallery images could not be loaded"));
    }
  }

  _openModal = modal => {
    const length = this.state.imageList.length;
    if (modal > -1 && modal < length) {
      this.setState({ modal })
    }
  }

  _anySelected = () => this.state.selected !== undefined;

  _anyModal = () => this.state.modal !== undefined;

  _closeModal = () => this.setState({ modal: undefined });

  _columns = width => width < 1000 ? (width < 700 ? 2 : 3) : 5;

  render() {
    const { dataList, selected, modal, imageList } = this.state;
    const { deviceWidth } = this.props;

    return (
      <div className="App">
        <main>
          <Front
            dataList={dataList}
            selected={selected}
            onSelect={this._onSelect}
            isMobile={deviceWidth < 700}
          />

          {
            this._anySelected() &&
            imageList &&
            (
              <Gallery
                images={imageList}
                columns={this._columns(deviceWidth)}
                click={this._openModal}
                observer={this.observer}
              />
            )
          }

          {
            this._anyModal() &&
            imageList &&
            (
              <Modal
                image={imageList[modal]}
                close={this._closeModal}
                next={() => this._openModal(modal + 1)}
                previous={() => this._openModal(modal - 1)}
                showPrevious={modal > 0}
                showNext={modal < (imageList.length - 1)}
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

export default sizes(App.sizesToProps)(App)