import React, { Component } from "react";
import Front from "./Front";
import Gallery from "./Gallery";
import FrontLoader from "./FrontLoader";
import Preloader from "../preloader";
import Footer from "./Footer";
import withSizes from 'react-sizes'
import { fetchFrontData, fetchPhotos } from "../api";

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
        new Preloader().loadData(dataList, this._imagesLoaded);
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

  _imagesLoaded = () => { 
    setTimeout(() => this.setState({ isLoaded: true}), 2500);
  }

  render() {
    const { dataList, photos, isLoaded } = this.state;
    const {deviceWidth} = this.props;
    const columns = deviceWidth < 1000 ? (deviceWidth < 700 ? 2 : 3) : 5;

    return (
      <div>
        <main>
          <FrontLoader display={!isLoaded}/>
          <Front
            dataList={dataList}
            onSelect={this._loadGallery}
            onDeselect={this._hideGallery}
            isMobile={deviceWidth < 600}
          />
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