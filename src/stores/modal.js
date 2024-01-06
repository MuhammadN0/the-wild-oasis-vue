import { defineStore } from 'pinia';
export default defineStore('modal', {
  state: () => ({ isOpen: false, state: 'none', currentCabin: null }),
  actions: {
    reset() {
      this.state = 'none';
      this.isOpen = false;
      this.currentCabin = null;
    },
    startAddCabin() {
      this.state = 'addingCabin';
      this.isOpen = true;
    },
    startEditing(cabin) {
      this.state = 'editingCabin';
      this.isOpen = true;
      this.currentCabin = cabin;
    },
    startDeleteCabin(cabin) {
      this.state = 'deletingCabin';
      this.isOpen = true;
      this.currentCabin = cabin;
    },
  },
});
