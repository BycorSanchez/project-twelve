# Countries to Discover

Countries to discover is a web application which, through a photo gallery, let the user know up to twelve countries of great tourist, cultural, natural and gastronomic interest.

## Features

* Show multiple selectable options (countries).
* Show information based on selected option.
* Show photos related to selected option (country).
* Allow to deselect option (go back).
* Load gallery photos only when they are going to be displayed (lazy load).
* Show modal when a photo is selected.
* Allow navigation inside modal.
* Select automatically the format of the photo that best fits in the available space (modal and gallery photos).
* Preload option images and display a loading page in the meantime.
* ~~Load gallery photos using [Pexels API](https://www.pexels.com/api/).~~ Discarted to prevent API KEY public exposure, it is simulated loading photos from JSON file instead.

## Technologies

* ES6 JavaScript
* [React ![react](readme/react-logo.png)](https://reactjs.org)
* [CSS Modules ![css modules](readme/css-modules-logo.png)](https://github.com/css-modules/css-modules)

## Components

* *App*: main component
* *Front*: option panel
* *Gallery*: photo gallery
* *Footer*: app footer
* *Slice*: background slices
* *Modal*: modal photo
* *FrontLoader*: preloader
* *Rotable*: text with CSS transition

## Dependencies

* react
* react-dom
* [react-scripts](https://github.com/facebook/create-react-app): create-react-app module.
* [axios](https://github.com/axios/axios): promise based HTTP client.
* [intersection-observer](https://w3c.github.io/IntersectionObserver/)
* [react-sizes](https://github.com/renatorib/react-sizes): high-order component to get window sizes (width and height).
* [react-transition-group](https://github.com/reactjs/react-transition-group): components for managing component animation.
* [react-aria-modal](https://github.com/davidtheclark/react-aria-modal): accessible and flexible React modal.
* [classnames](https://github.com/JedWatson/classnames): utility for conditionally joining class names together.

## Acknowledges

Photos from [Pexels ![pexels](readme/pexels-logo.png)](https://www.pexels.com).  
Icons by [iconmonstr ![iconmonstr](readme/iconmonstr-logo.png)](https://iconmonstr.com).  
Developed by Bycor Sánchez.

## Notes

It is not guaranteed that the photographs displayed on this web application are directly related to the listed countries.