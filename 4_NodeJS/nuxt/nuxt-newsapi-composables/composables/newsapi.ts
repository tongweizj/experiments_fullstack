export const newsTop = async (newsKey: string) => {
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=ca&apiKey=${newsKey}`;
  let resp = await useFetch(apiUrl);
  return resp.data.value;
};

export const newsTag = async (newsKey: string, tag: string) => {
  const apiUrl = `https://newsapi.org/v2/everything?sortBy=relevancy&language=zh&q=${tag}&apiKey=${newsKey}`;
  console.log("apiUrl:", apiUrl);
  let resp = await useFetch(apiUrl);
  return resp.data.value;
};
