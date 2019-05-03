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
    selected: undefined
  };

  componentDidMount() {
    fetchFrontData()
      .then(dataList => this.setState({ dataList }))
      .catch(() => console.error("Front page information could not be loaded"));
  }

  _onSelect = item => {
    this._resetState(item);
    this._loadImages(item);
  };

  _onUnSelect = () => this._resetState();

  _resetState(selected = undefined){
    this.setState({
      selected,
      images: []
    });
  }

  _loadImages(item) {
    const data = this.state.dataList[item];
    fetchImages(data.title)
      .then(images => this.setState({ images }))
      .catch(() => {
        this.setState({ images: [] });
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
    const { dataList, selected, images } = this.state;
    const deviceWidth = this.props.deviceWidth;

    const showGallery = images && selected !== undefined;

    return (
      <div>
        <main>
          <Front
            dataList={dataList}
            selected={selected}
            onSelect={this._onSelect}
            onUnselect={this._onUnSelect}
            isMobile={deviceWidth < 600}
          />

          {showGallery && (
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