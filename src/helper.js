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
