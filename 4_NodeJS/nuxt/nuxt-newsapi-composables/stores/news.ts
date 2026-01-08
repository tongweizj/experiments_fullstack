const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export const useNewsStore = defineStore("news", {
  state: () => ({
    posts: {} as { [k: string]: [] },
    lifetime: {} as { [k: string]: any },
  }),

  // getters: {
  //   double: (state) => state.n * 2,
  // },

  actions: {
    startLife(tag: string) {
      this.lifetime[tag] = new Date().getTime();
      console.log("startLife:", this.lifetime);
    },
    checkLife(tag: string) {
      console.log("checkLife:", this.lifetime[tag]);
      let timestamp = this.lifetime[tag];
      if (timestamp == "undefined") return false;

      let now = new Date().getTime();
      return now - timestamp > 1000 * 60 * 1 ? true : false;
    },

    async fetchTopNews(newsKey: string) {
      if (this.checkLife("topNews")) return;
      const resp = await newsTop(newsKey);
      this.posts["topnews"] = resp.articles;
      this.startLife("topnews");
    },
    async fetchTagNews(newsKey: string, tag: string) {
      if (this.checkLife(tag)) return;
      const resp = await newsTag(newsKey, tag);
      this.posts[tag] = resp.articles;
      this.startLife(tag);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot));
}
