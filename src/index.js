import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

if (!window.IntersectionObserver){
    require('intersection-observer');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
