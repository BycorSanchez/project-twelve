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
    images: []
  };

  componentDidMount() {
    fetchFrontData()
      .then(dataList => this.setState({ dataList }))
      .catch(() => console.error("Front page information could not be loaded"));
  }

  _loadGallery = item => {
    this._resetImages();
    this._loadImages(item);
  };

  _hideGallery = () => this._resetImages();

  _loadImages(item) {
    const data = this.state.dataList[item];
    fetchImages(data.title)
      .then(images => this.setState({ images }))
      .catch(() => {
        this.setState({ images: [] });
        console.error("Gallery images could not be loaded");
      });
  }

  _resetImages(){
    this.setState({ images: [] });
  }

  _columns = () => {
    const width = this.props.deviceWidth;
    return width < 1000 ? (width < 700 ? 2 : 3) : 5;
  }

  //TODO: Select image size based on device resolution
  _imageSources = () => this.state.images.map(image => image.src["original"]);

  render() {
    const { dataList, images } = this.state;
    const deviceWidth = this.props.deviceWidth;

    return (
      <div>
        <main>
          <Front
            dataList={dataList}
            onSelect={this._loadGallery}
            onDeselect={this._hideGallery}
            isMobile={deviceWidth < 600}
          />

          {images && images.length > 0 && (
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