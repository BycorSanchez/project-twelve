export default class ImagePreloader {

    constructor(){
        this.loaded = 0;
    }

    loadData(dataList, onload, onerror){
        const urls = dataList.map(d => d.url);
        this.load(urls, onload, onerror);
    }

    load(urls, onload, onerror) {
        if (!urls) return;

        this.urls = urls;
        this.onLoad = onload;
        urls.forEach(src => {
            const image = new Image();
            image.src = src;
            image.onload = this._onLoad.bind(this);
            image.onerror = onerror;
        });
    }

    _onLoad = () => {
        this.loaded++;
        if (this.loaded >= this.urls.length && this.onLoad){
            this.onLoad();
        }
    }
}