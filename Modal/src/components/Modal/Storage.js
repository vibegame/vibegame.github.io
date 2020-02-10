export const generateUKey = () => {
  return `f${(+new Date).toString(16)}`;
};

class Storage {
  storage = new Map();

  _generateUKey = () => {
    let key = generateUKey();
    while(this.storage.has(key)) {
      key = generateUKey();
    }

    return key;
  };

  addItem = ({item, key: _key}) => {
    const KEY = _key || this._generateUKey();

    if(this.storage.has(KEY)) {
      console.warn(`Storage has item with key ${KEY}. You can use other method as updateItem :: Storage`);
    } else {
      this.storage.set(KEY, item);
    }

    return KEY;
  };

  getItem = key => {
    return this.storage.get(key);
  };

  deleteItem = key => {
    const response = this.storage.delete(key);

    if(!response) {
      console.error(`Item with key ${key} is absent :: Storage`);
    }
  };

  updateItem = ({key, item}) => {
    if(this.storage.has(key)) {
      this.storage.set(key, item);
    } else {
      console.warn(`Storage hasn't item with key ${key}. You should add it with method addItem :: Storage`);
    }
  };

  clear = () => {
    this.storage.clear();
  };

  get items() {
    const items = [];

    for(const item of this.storage.values()) {
      items.push(item);
    }

    return items;
  };

  get keys() {
    const keys = [];

    for(const key of this.storage.keys()) {
      keys.push(key);
    }

    return keys;
  };

  get count() {
    return this.storage.size;
  };

  get latest() {
    return [this.keys[this.count - 1], this.items[this.count - 1]]; // [key, value]
  }

  get isEmpty() {
    return !this.storage.keys.length;
  }
}

export default Storage;
