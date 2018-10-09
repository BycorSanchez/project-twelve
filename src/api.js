// Get front page data (slice image, title, etc)
export const fetchFrontData = () => fetch("data/front-data.json").then(r => r.json());

// Get images from a file
export const fetchImages = filename => fetch(`data/${filename.replace(/\s+/, "")}.json`).then(r => r.json());