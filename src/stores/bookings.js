import { db } from '@/firebase/config';
import { defineStore } from 'pinia';

export default defineStore('bookings',{
  state: () => ({ isLoading: false, bookings: [] }),
  actions: {
    async getBookings() {
      try {
        this.isLoading = true;
        const bookingsSnapshot = await db
          .collection('bookings')
          .orderBy('startDate', 'asc')
          .get();
        bookingsSnapshot.forEach((doc) => {
          this.bookings.push({ ...doc.data(), id: doc.id });
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteBooking(id){
      this.isLoading = true;
      await db.collection('bookings').doc(id).delete();
      this.isLoading = false;
    },
  },
});
