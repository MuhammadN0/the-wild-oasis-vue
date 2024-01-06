import { cabinsCollection } from '@/firebase/config';
import { defineStore } from 'pinia';

export default defineStore('cabins', {
  state: () => ({ cabins: [] }),
  actions: {
    async getCabins() {
      try {
        this.cabins = []
        const snapshots = await cabinsCollection.get();
        snapshots.forEach((snapshot) => {
          this.cabins.push({ ...snapshot.data(), id: snapshot.id });
        });
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteCabin(id) {
      try {
        await cabinsCollection.doc(id).delete();
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
