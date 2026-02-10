import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export function ListItem(prop) {
  const [topstorie, setTopstorie] = useState({});

  const { data, error, isLoading } = useSWR(
    `https://hacker-news.firebaseio.com/v0/item/${prop.id}.json?print=pretty`,
    fetcher
  );
  useEffect(() => {
    if (!isLoading) {
      setTopstorie({ ...data });
    }
  }, [isLoading]);

  return isLoading === false && <li>{topstorie.title}</li>;
}
