import React, { Component } from "react";
import Front from "./Front";
import Gallery from "./Gallery";
import Footer from "./Footer";
import Modal from "../components/Modal";
import sizes from "react-sizes";
import { fetchFrontData, fetchImages, imageSize } from "../api";

class App extends Component {
  static sizesToProps({ width }) {
    return { deviceWidth: width };
  }

  state = {
    dataList: [],
    images: [],
    selected: undefined,
    modal: undefined,
    galleryError: false
  };

  componentDidMount() {
    fetchFrontData()
      .then(dataList => this.setState({ dataList }))
      .catch(() => console.error("Front page information could not be loaded"));
  }

  _onSelect = item => {
    this.setState({
      selected: item,
      images: [],
      galleryError: false
    });
    if (item !== undefined) {
      this._loadimages(item);
    }
  };

  _loadimages(item) {
    const data = this.state.dataList[item];
    fetchImages(data.title)
      .then(images => this.setState({ images }))
      .catch(() => {
        this.setState({ galleryError: true });
        console.error("Gallery images could not be loaded");
      });
  }

  _openModal = modal => {
    const length = this.state.images.length;
    if (modal > -1 && modal < length) {
      this.setState({ modal });
    }
  };

  _closeModal = () => this.setState({ modal: undefined });

  _columns = width => (width < 1000 ? (width < 700 ? 2 : 3) : 5);

  _imageSource = (data, width) => data.src[imageSize(width)];

  render() {
    const { dataList, selected, modal, images, galleryError } = this.state;
    const deviceWidth = this.props.deviceWidth;

    const anySelected = this.state.selected !== undefined;
    const anyModal = this.state.modal !== undefined;
    const columns = this._columns(deviceWidth);

    return (
      <div>
        <main>
          <Front
            dataList={dataList}
            selected={selected}
            onSelect={this._onSelect}
            isMobile={deviceWidth < 600}
          />

          {anySelected && !galleryError && (
            <Gallery
              images={images.map(i =>
                this._imageSource(i, deviceWidth / columns)
              )}
              columns={columns}
              click={this._openModal}
            />
          )}

          {anyModal && images && (
            <Modal
              image={this._imageSource(images[modal], deviceWidth)}
              close={this._closeModal}
              next={() => this._openModal(modal + 1)}
              previous={() => this._openModal(modal - 1)}
              showPrevious={modal > 0}
              showNext={modal < images.length - 1}
            />
          )}
        </main>
        {anySelected && <Footer />}
      </div>
    );
  }
}

export default sizes(App.sizesToProps)(App);
