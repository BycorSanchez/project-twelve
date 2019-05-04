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

export const photoResolution = width => {
  if (width < 190) return "small";
  if (width < 600) return "medium";
  if (width < 940) return "large";
  if (width < 1500) return "large2x";
  else return "original";
}