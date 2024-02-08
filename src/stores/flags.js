import { defineStore } from "pinia";

export default defineStore('flags',{
  state: () => ({
    flags: {},
  }),
  actions: {
    async getFlags() {
      const res = await fetch("https://flagcdn.com/en/codes.json");
      const data = await res.json();
      this.flags = data;
    },
  },
});
