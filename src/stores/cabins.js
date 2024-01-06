import { cabinsCollection } from '@/firebase/config';
import { sortByCapacity, sortByName, sortByPrice } from '@/utils/helpers';
import { defineStore } from 'pinia';

export default defineStore('cabins', {
  state: () => ({
    cabins: [],
    sort: 'name|atz',
    filter: 'all',
    isLoading: false,
  }),
  actions: {
    async getCabins() {
      try {
        this.isLoading = true;
        this.cabins = [];
        const snapshots = await cabinsCollection.get();
        snapshots.forEach((snapshot) => {
          this.cabins.push({ ...snapshot.data(), id: snapshot.id });
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCabin(id) {
      try {
        await cabinsCollection.doc(id).delete();
      } catch (err) {
        console.log(err.message);
      }
    },
    async duplicateCabin(cabin) {
      try {
        await cabinsCollection.add(cabin);
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  getters: {
    formattedCabins() {
      const sortBy = this.sort.split('|')[0];
      const order = this.sort.split('|')[1];
      let sorted;
      if (sortBy === 'name') {
        sorted = sortByName(this.cabins, order);
      }
      if (sortBy === 'price') {
        sorted = sortByPrice(this.cabins, order);
      }
      if (sortBy === 'capacity') {
        sorted = sortByCapacity(this.cabins, order);
      }
      if (this.filter === 'all') return sorted;
      if (this.filter === 'with')
        return sorted.filter((cabin) => cabin.discount > 0);
      if (this.filter === 'without')
        return sorted.filter((cabin) => cabin.discount === 0);
      return [];
    },
  },
});
