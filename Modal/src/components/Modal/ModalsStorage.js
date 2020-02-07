import Storage from "./Storage";

class ModalsStorage extends Storage {

  close = key => {
    this.getItem(key).close();
  };

  open = key => {
    this.getItem(key).open();
  };

  get openedModals() {
   return this.items.filter((modal) => modal.isOpen);
  }

}

export default ModalsStorage;
