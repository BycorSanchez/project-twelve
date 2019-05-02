import React, { Component } from "react";
import Front from "./Front";
import Gallery from "./Gallery";
import Footer from "./Footer";
import withSizes from 'react-sizes'
import { fetchFrontData, fetchImages } from "../api";

const sizeToProps = ({ width }) => {
  return { deviceWidth: width };
}

class App extends Component {

  state = {
    dataList: [],
    images: [],
    selected: undefined,
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

  _columns = () => {
    const width = this.props.deviceWidth;
    return width < 1000 ? (width < 700 ? 2 : 3) : 5;
  }

  //TODO: Select image size based on device resolution
  _imageSources = () => this.state.images.map(image => image.src["original"]);

  render() {
    const { dataList, selected, images, galleryError } = this.state;
    const deviceWidth = this.props.deviceWidth;

    const anySelected = this.state.selected !== undefined;

    return (
      <div>
        <main>
          <Front
            dataList={dataList}
            selected={selected}
            onSelect={this._onSelect}
            isMobile={deviceWidth < 600}
          />

          {images && anySelected && !galleryError && (
            <Gallery 
              images={this._imageSources()} 
              columns={this._columns()}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default withSizes(sizeToProps)(App);