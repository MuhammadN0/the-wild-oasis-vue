import { db } from '@/firebase/config';
import { defineStore } from 'pinia';

export default defineStore('settings', {
  state: () => ({ settings: {}, isLoading: false }),
  actions: {
    async getSettings() {
      try {
        this.isLoading = true;
        const settingsCollection = db.collection('settings');
        const settingsDoc = settingsCollection.doc('settings');
        const settingsSnapshot = await settingsDoc.get();
        this.settings = { ...settingsSnapshot.data() };
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isLoading = false;
      }
    },
    async updateSettings(name, value) {
      try {
        this.isLoading = true;
        const settingsCollection = db.collection('settings');
        const settingsDoc = settingsCollection.doc('settings');
        await settingsDoc.update({ [name]: value });
        await this.getSettings();
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
