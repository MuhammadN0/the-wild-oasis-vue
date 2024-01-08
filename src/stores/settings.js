import { db } from '@/firebase/config';
import { defineStore } from 'pinia';

export default defineStore('settings', {
  state: () => ({ settings: {}, isLoading:false }),
  actions: {
    async getSettings() {
      this.isLoading = true
      const settingsCollection = db.collection('settings');
      const settingsDoc = settingsCollection.doc('settings');
      const settingsSnapshot = await settingsDoc.get();
      this.settings = { ...settingsSnapshot.data() };
      this.isLoading = false
    },
    async updateSettings(name,value){
      this.isLoading = true
      const settingsCollection = db.collection('settings');
      const settingsDoc = settingsCollection.doc('settings');
      await settingsDoc.update({[name]:value});
      await this.getSettings();
      this.isLoading = false
    }
  },
});
