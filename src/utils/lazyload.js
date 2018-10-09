export const config = {
  rootMargin: '50px',
  threshold: 0.5
}

export const lazyLoadImage = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      entry.target.src = entry.target.dataset.src
    }
  })
}