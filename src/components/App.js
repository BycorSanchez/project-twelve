import React, { Component } from "react";
import Front from "./Front";
import Gallery from "./Gallery";
import Preloader from "./Preloader";
import Footer from "./Footer";
import withSizes from 'react-sizes'
import { fetchFrontData, fetchPhotos } from "../api";
import { preloadImages } from "../helper";

const sizeToProps = ({ width }) => {
  return { deviceWidth: width };
}

class App extends Component {

  state = {
    dataList: [],
    photos: [],
    isLoaded: false
  };

  componentDidMount() {
    fetchFrontData()
      .then(dataList => {
        const urls = dataList.map(d => d.url); 
        preloadImages(urls, this._imageLoaded);
        this.setState({ dataList });
      })
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

  _imageLoaded = () => {
    this.imagesLoaded = this.imagesLoaded ? this.imagesLoaded + 1 : 1;
    if (this.imagesLoaded >= this.state.dataList.length){
      this.setState({ isLoaded: true});
    }
  }

  render() {
    const { dataList, photos, isLoaded } = this.state;
    const {deviceWidth} = this.props;
    const columns = deviceWidth < 1000 ? (deviceWidth < 700 ? 2 : 3) : 5;

    return (
      <div>
        <main>
          {!isLoaded && (<Preloader/>)}
          {isLoaded && 
            (<Front
              dataList={dataList}
              onSelect={this._loadGallery}
              onDeselect={this._hideGallery}
              isMobile={deviceWidth < 600}
            />)
          }
          {photos && photos.length > 0 && (
            <Gallery 
              photos={photos} 
              columns={columns}
              deviceWidth={deviceWidth}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default withSizes(sizeToProps)(App);