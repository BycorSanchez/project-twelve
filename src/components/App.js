import React, { Component } from "react";
import Front from "./Front";
import Gallery from "./Gallery";
import Footer from "./Footer";
import withSizes from 'react-sizes'
import { fetchFrontData, fetchPhotos, photoResolution } from "../api";

const sizeToProps = ({ width }) => {
  return { deviceWidth: width };
}

class App extends Component {

  state = {
    dataList: [],
    photos: []
  };

  componentDidMount() {
    fetchFrontData()
      .then(dataList => this.setState({ dataList }))
      .catch(() => console.error("Front page information could not be loaded"));
  }

  _loadGallery = item => {
    this._resetPhotos();
    this._loadPhotos(item);
  };

  _hideGallery = () => this._resetPhotos();

  _loadPhotos(item) {
    const data = this.state.dataList[item];
    fetchPhotos(data.photos)
      .then(photos => this.setState({ photos }))
      .catch(() => {
        this.setState({ photos: [] });
        console.error("Gallery images could not be loaded");
      });
  }

  _resetPhotos(){
    this.setState({ photos: [] });
  }

  render() {
    const { dataList, photos } = this.state;
    const width = this.props.deviceWidth;

    const columns = width < 1000 ? (width < 700 ? 2 : 3) : 5;

    return (
      <div>
        <main>
          <Front
            dataList={dataList}
            onSelect={this._loadGallery}
            onDeselect={this._hideGallery}
            isMobile={this.props.deviceWidth < 600}
          />

          {photos && photos.length > 0 && (
            <Gallery 
              photos={photos} 
              columns={columns}
              resolution={photoResolution(width)}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default withSizes(sizeToProps)(App);