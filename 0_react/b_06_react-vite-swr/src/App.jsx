import { useEffect, useState } from "react";
import "./App.css";
import useSWR from "swr";
import { ListItem } from "./components/ListItem";
const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const [topstories, setTopstories] = useState([]);
  const [fetchFinished, setFetchFinished] = useState(false);
  const [topstoriesItems, setTopstoriesItems] = useState();

  const { data, error, isLoading } = useSWR(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
    fetcher
  );
  // 监测fetch是否结束，改变状态
  useEffect(() => {
    if (!isLoading) {
      setTopstories(data);
      setFetchFinished(!isLoading);
    }
  }, [isLoading]);

  // 监测fetch是否结束，生产item组件
  useEffect(() => {
    if (fetchFinished && topstories != [] && topstories != undefined) {
      const liItems = topstories.map((item, index) => {
        return <ListItem key={index} id={item} />;
      });
      setTopstoriesItems(liItems);
    }
  }, [fetchFinished]);

  return (
    <>
      <div>
        <h1>HackNews</h1>
        {fetchFinished == false ? <p>Loading</p> : <ul>{topstoriesItems}</ul>}
      </div>
    </>
  );
}

export default App;
