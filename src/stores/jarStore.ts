import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Movie, Jar } from "@/dto";

export const useJarStore = defineStore("jarStore", () => {
  const jarConfig = useLocalStorage<{ [key: string]: Jar }>("jarConfig", {});
  const activeJarId = useLocalStorage<string>("activeJarId", null);
  const version = useLocalStorage<number>("version", 0);

  const latestVersion = 2;

  const jars = computed<Jar[]>(() => {
    return Object.values(jarConfig.value);
  });
  const activeJar = computed<Jar>(() => {
    return jarConfig.value[activeJarId.value];
  });
  const movies = computed<Movie[]>(() => {
    return activeJar.value.contents;
  });

  function init() {
    if (!version.value || version.value < 2) {
      const movies = JSON.parse(localStorage.getItem("movies")) as Movie[];
      addJar("The Jar", movies || []);
    }
    if (!jars.value.length) {
      addJar("The Jar");
    }
    if (!activeJar.value) {
      setActiveJar(jars.value[0].id);
    }
    version.value = latestVersion;
  }

  function addMovie(movie: Movie, jarId: string = "") {
    const selectedJar = jarConfig.value[jarId || activeJarId.value];
    selectedJar.contents.push(movie);
  }
  function removeMovie(id: number, jarId: string = "") {
    const selectedJar = jarConfig.value[jarId || activeJarId.value];
    const index = selectedJar.contents.findIndex((x) => x.tmdbRef === id);
    if (index > -1) {
      selectedJar.contents.splice(index, 1);
    }
  }
  function updateWatched(id: number, val: boolean, jarId: string = "") {
    const selectedJar = jarConfig.value[jarId || activeJarId.value];
    const movie = selectedJar.contents.find((x) => x.tmdbRef === id);
    movie.watched = val;
  }
  function setActiveJar(jarId: string) {
    activeJarId.value = jarId;
  }
  function addJar(name: string, content: Movie[] = []) {
    const id = crypto.randomUUID();
    jarConfig.value[id] = {
      id: id,
      name: name,
      contents: content,
    };
  }
  function editJar(jar: Jar) {
    jarConfig[jar.id] = jar;
  }
  function deleteJar(id: string) {
    delete jarConfig.value[id];
    if (id == activeJarId.value) {
      if (Object.values(jarConfig)) {
        setActiveJar(Object.keys(jarConfig)[0]);
      } else {
        activeJarId.value = "";
      }
    }
  }
  function bulkAdd(jars: Jar[]) {
    jars.forEach((j) => addJar(j.name, [...j.contents]));
  }
  return {
    jarConfig,
    movies,
    jars,
    activeJarId,
    init,
    addMovie,
    removeMovie,
    updateWatched,
    addJar,
    editJar,
    deleteJar,
    setActiveJar,
    bulkAdd,
  };
});
