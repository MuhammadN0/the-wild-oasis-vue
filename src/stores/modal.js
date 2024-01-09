import { defineStore } from 'pinia';
export default defineStore('modal', {
  state: () => ({
    isOpen: false,
    state: 'none',
    currentBooking: null,
    resourceName: '',
    currentCabin: null,
  }),
  actions: {
    deleteHandler() {
    },
    reset() {
      this.state = 'none';
      this.resourceName = '';
      this.isOpen = false;
      this.currentCabin = null;
      this.deleteHandler = () => {};
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
    startDeleteCabin(cabin, handler) {
      this.state = 'deleting';
      this.isOpen = true;
      this.currentCabin = cabin;
      this.resourceName = 'Cabin';
      this.deleteHandler = handler;
    },
    startDeleteBooking(booking, handler) {
      this.state = 'deleting';
      this.isOpen = true;
      this.currentBooking = booking;
      this.resourceName = 'Booking';
      this.deleteHandler = handler;
    },
  },
});
