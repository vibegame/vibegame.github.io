

class Storage {

    constructor(columns) {
        this._updateColumns(columns);
    }

    _createStorage() {
        const storage = new Map();


        this.columns.forEach(({key, ...column}) => {
            storage.set(key, column);
        });

        return storage;
    }

    _updateColumns(columns) {
        this.columns = columns;
        this.storage = this._createStorage();
    }

    getItem(key) {
        if(this.storage.has(key))
            return this.storage.get(key);
        else
            console.warn(`Storage does not have item with key ${key}`)
    }

    getWidth(key) {
        return this.getItem(key).width;
    }

    getWidths() {
        const widths = {};

        this.keys.forEach(key => {
            widths[key] = this.getWidth(key);
        });

        return widths;

    }

    changeWidth({key, width}) {
        const item = this.getItem(key);
        const {maxWidth, minWidth} = item;

        if(width > maxWidth) {
            item.width = maxWidth;
        } else if(width < minWidth) {
            item.width = minWidth;
        } else {
            item.width = width;
        }

    }

    get keys() {
        const keys = [];
        for(let key of this.storage.keys()) {
            keys.push(key);
        }
        return keys;
    }

}

export default Storage;