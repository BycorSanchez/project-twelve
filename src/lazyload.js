export const config = {
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
