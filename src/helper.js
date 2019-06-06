// Generate numbers from 'start' to 'stop' multiples of 'step'
export const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

export const lazyLoadConfig = {
  rootMargin: "20px",
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

// Choose best photo based on available width
export const photoSrc = (photo, imgWidth) => {
  return photo.src[format(imgWidth)];
}

const format = width => {
  if (width < 200) return "thumb";
  if (width < 400) return "small";
  if (width < 800) return "medium";
  if (width < 2000) return "large";
  return "full";
}