// Generate numbers from 'start' to 'stop' multiples of 'step'
export const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

export const lazyLoadConfig = {
  rootMargin: "10px",
  threshold: 0
};

export const lazyLoadImage = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.src = entry.target.dataset.src;
    }
  });
};

// Choose best photo based on real img available width
export const photoUrl = (photo, imgWidth) => {
  const imgHeight = (imgWidth * photo.height) / photo.width;
  return photo.src[format(imgWidth, imgHeight)];
}

const format = (width, height) => {
  if (width < 190 && height < 350) return "small";
  if (width < 600 && height < 650) return "medium";
  if (width < 950 && height < 900) return "large";
  else return "large2x";
}