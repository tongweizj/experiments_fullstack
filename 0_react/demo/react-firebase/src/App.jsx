import { useState, useEffect } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { countCollection, db } from "./firebase";

function App() {
  const [count, setCount] = useState();
  const [countID, setCountID] = useState("");
  const [tempCount, setTempCount] = useState();

  useEffect(() => {
    // 从firebases同步 count，countID
    readFromFB();
  }, []);

  useEffect(() => {
    // 监控，count，变了就同步到temp
    setTempCount(count);
  }, [count]);

  useEffect(() => {
    // 监控，tempCount，变了就同步到firebase
    update2FB(tempCount);
  }, [tempCount]);

  // 读取最后一次创建的记数器
  function readFromFB() {
    console.log("readFromFB");
    onSnapshot(countCollection, function (snapshot) {
      const counter = snapshot.docs[snapshot.docs.length - 1];
      console.log("counter:", counter);
      if (counter != undefined) {
        setCount(() => counter.data().value);
        setCountID(() => counter.id);
      }
    });
  }

  // 给数字 +1， 同步到firebase
  async function update2FB(temp) {
    console.log("update2FB");
    const counterRef = doc(db, "count", countID);
    console.log("tempCount :", temp);
    console.log(typeof temp);
    setDoc(counterRef, { value: temp }, { merge: true });
  }

  // 创建新的计数器
  async function create2FB() {
    console.log("create2FB");
    const newCount = {
      value: 0,
    };

    const counter = await addDoc(countCollection, newCount);
    console.log(counter);
    setCountID(() => counter.id);
    setCount(() => 0);
  }
  async function delete2FB() {
    console.log("delete2FB");
    const counterRef = doc(db, "count", countID);
    await deleteDoc(counterRef);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {count != undefined ? (
          <span> count is {tempCount}</span>
        ) : (
          <span>please create a counter!</span>
        )}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <p>firebase action:</p>
        <button className="fbBtn" onClick={readFromFB}>
          read
        </button>
        <button className="fbBtn" onClick={() => setTempCount(tempCount + 1)}>
          count + 1
        </button>
        <button className="fbBtn" onClick={create2FB}>
          create
        </button>

        <button className="fbBtn" onClick={delete2FB}>
          delete
        </button>
      </div>
    </>
  );
}

export default App;
