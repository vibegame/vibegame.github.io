import Storage from "./Storage";

class ScatterStorage extends Storage {

    constructor(mountNode = document.body) {
        super();
        this._mountNode = mountNode;
    }

    _setStyles = () => {
        this._mountNode.style.overflow = 'hidden';
    };

    _removeStyles = () => {
        this._mountNode.style.overflow = '';
    };

    addItem(item) {
        const key = super.addItem(item);

        if(this.count === 1) {
            this._setStyles();
        }

        return key;
    };

    deleteItem(key) {
        super.deleteItem(key);
        if(this.count === 0) {
            this._removeStyles();
        }
    }
}

export default ScatterStorage;
