import axios from 'axios';

// Get front page data (slice image, title, etc)
export const fetchFrontData = () => {
  return axios("res/data/front-data.json").then(response => response.data);
}

export const fetchImages = (query, page = 1) => {
  return fetch(
    `https://api.pexels.com/v1/search/?page=${page}&per_page=15&query=${query.replace(/ /g,"+")}`,
    {
      method: "GET",
      headers: {
        Authorization: "XXXX"
      }
    }
  )
    .then(r => r.json())
    .then(r => r.photos);
};

export const imageSize = width => {
  if (width < 190) return "small";
  if (width < 500) return "medium";
  if (width < 940) return "large";
  if (width > 1500) return "original";
  else return "large2x";
};
