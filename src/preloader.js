export default class Preloader {

    loadData(dataList, onload, onerror){
        this.load(dataList.map(d => d.url), onload, onerror);
    }

    load(urls, onload, onerror) {
        if (!urls) return;

        this.loaded = 0;
        this.urls = urls;
        this.onLoad = onload;
        urls.forEach(src => {
            const image = new Image();
            image.src = src;
            image.onload = this._onLoad.bind(this);
            image.onerror = onerror;
        });
    }

    _onLoad(){
        this.loaded++;
        if (this.loaded >= this.urls.length && this.onLoad){
            this.onLoad();
        }
    }
}