export const generateUKey = () => {
  return `f${(+new Date).toString(16)}`;
};

class Storage {
  storage = new Map();

  addItem = (item, _key) => {
    const KEY = _key || generateUKey();
    this.storage.set(KEY, item);

    return KEY;
  };

  getItems = () => {
    const items = [];

    for(const item of this.storage.values()) {
      items.push(item);
    }

    return items;
  };

  getItem = key => {
    return this.storage.get(key);
  };

  deleteItem = (key) => {
    const response = this.storage.delete(key);

    if(!response) {
      console.error(`Item with key ${key} is absent :: Storage`);
    }
  };

  getKeys = () => {
    const order = [];

    for(const key of this.storage.keys()) {
      order.push(key);
    }

    return order;
  };

  clearAll = () => {
    this.storage.clear();
  };

  getCount = () => {
    return this.storage.size;
  };
}

export default Storage;
