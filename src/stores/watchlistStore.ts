import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useWatchlistStore = defineStore("watchlistStore", () => {
  const filmList = useLocalStorage("filmList", []);
  return {
    filmList,
  };
});
