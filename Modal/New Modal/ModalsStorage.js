import Storage from "./Storage";
import {modal} from "../../../Modals/Modals";


class ModalsStorage extends Storage {

  isEmpty = () => {
    return !this.getCount();
  };

  createModal = (modal, key) => {
    return this.addItem(modal, key);
  };

  deleteModal = (key) => {
    this.deleteItem(key);
  };

  getModal = (key) => {
    return this.getItem(key);
  };

  getModals = () => {
    return this.getItems();
  };

  clearAll = () => {
    const modals = this.getItems();
    modals.forEach((modal) => {
      modal.close();
    });
  };

  popModal = () => {
    const modals = this.getModals();
    const keys = this.getKeys();
    modals[modals.length - 1].close();
  };

}

export default ModalsStorage;
