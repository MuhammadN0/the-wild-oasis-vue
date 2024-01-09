import { db } from "@/firebase/config";
import { defineStore } from "pinia";

export default defineStore('guests',{
  state: () => ({isLoading:false, guests:[]}),
  actions:{
    async getGuests() {
      try {
        this.isLoading = true;
        const guestsSnapshot = await db.collection('guests').get()
        guestsSnapshot.forEach(doc => {
          this.guests.push({...doc.data(),id:doc.id})
        })
      } catch (err) {
        console.log(err.message)
      } finally {
        this.isLoading = false
      }
    }
  }
})