import axios from 'axios';

// Get front page data (slice image, title, etc)
export const fetchFrontData = () => {
  return axios
    .get("res/data/datalist.json")
    .then(response => response.data);
}

export const fetchPhotos = url => {
  return axios
    .get(url)
    .then(response => response.data);
}