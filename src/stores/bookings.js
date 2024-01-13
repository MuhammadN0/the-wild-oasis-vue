import { db } from '@/firebase/config';
import { sortByDate, sortByBookingPrice } from '@/utils/helpers';
import { endOfToday, isAfter, isBefore, isToday, subDays } from 'date-fns';
import { defineStore } from 'pinia';

export default defineStore('bookings', {
  state: () => ({
    isLoading: false,
    bookings: [],
    sort: 'date|recent',
    filter: 'all',
    last: 7,
  }),
  actions: {
    async getBookings() {
      try {
        this.bookings = [];
        this.isLoading = true;
        const bookingsSnapshot = await db
          .collection('bookings')
          .orderBy('startDate', 'desc')
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
    async checkIn(id, data) {
      this.isLoading = true;
      await db
        .collection('bookings')
        .doc(id)
        .update({ ...data });
      await this.getBookings();
      this.isLoading = false;
    },
    async deleteBooking(id) {
      this.isLoading = true;
      await db.collection('bookings').doc(id).delete();
      this.isLoading = false;
    },
    async checkOut(id) {
      this.isLoading = true;
      await db.collection('bookings').doc(id).update({ status: 'checked-out' });
      await this.getBookings();
      this.isLoading = false;
    },
  },
  getters: {
    formattedBookings() {
      const sortBy = this.sort.split('|')[0];
      const order = this.sort.split('|')[1];
      let sorted;
      if (sortBy === 'date') {
        sorted = sortByDate(this.bookings, order);
      }
      if (sortBy === 'amount') {
        sorted = sortByBookingPrice(this.bookings, order);
      }
      if (this.filter === 'all') return sorted;
      if (this.filter === 'checked-out')
        return sorted.filter((booking) => booking.status === 'checked-out');
      if (this.filter === 'checked-in')
        return sorted.filter((booking) => booking.status === 'checked-in');
      if (this.filter === 'unconfirmed')
        return sorted.filter((booking) => booking.status === 'unconfirmed');
      return [];
    },
    dashboardBookings() {
      const firstDate = subDays(new Date(), this.last);
      const lastDate = endOfToday();
      return this.bookings.filter(
        (booking) =>
          isBefore(booking.startDate, lastDate) &&
          isAfter(booking.startDate, firstDate)
      );
    },
    todaysBookings(){
      return this.bookings.filter((booking) => isToday(booking.startDate) || isToday(booking.endDate));
    },
    todaysActivityBookings() {
      return this.todaysBookings.filter((booking) => isToday(booking.startDate) || isToday(booking.endDate))
    },
    createdBookings() {
      const firstDate = subDays(new Date(), this.last);
      const lastDate = endOfToday();
      return this.bookings.filter((booking)=> isBefore(booking.created_at,lastDate) && isAfter(booking.created_at,firstDate))
    },
  },
});

//isBefore //isAfter //subDays(date,number) //endOfToday
