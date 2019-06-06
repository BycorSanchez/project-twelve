export default class Preloader {

    loadData(dataList, onload, onerror){
        this.load(dataList.map(d => d.src), onload, onerror);
    }

    load(srcList, onload, onerror) {
        if (!srcList) return;

        this.loaded = 0;
        this.srcList = srcList;
        this.onload = onload;
        srcList.forEach(src => {
            const image = new Image();
            image.src = src;
            image.onload = this._onLoad.bind(this);
            image.onerror = onerror;
        });
    }

    _onLoad(){
        this.loaded++;
        if (this.loaded >= this.srcList.length && this.onload){
            this.onload();
        }
    }
}