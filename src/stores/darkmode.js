import { defineStore } from "pinia";

export default defineStore("darkmode", {
  state: () => ({
    isDarkMode: localStorage.getItem("isDarkMode")
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDarkMode));
    },
  },
});
