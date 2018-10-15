// Get front page data (slice image, title, etc)
export const fetchFrontData = () => fetch("data/front-data.json").then(r => r.json());

export const fetchImages = (query, page = 1) => {
    return fetch(
        `https://api.pexels.com/v1/search/?page=${page}&per_page=20&query=${query.replace(/ /g, '+')}`,
        {
            method: 'GET',
            headers: { "Authorization": "XXXX" }
        })
        .then(r => r.json())
        .then(r => r.photos);
}