import React from 'react';
import ReactDOM from 'react-dom';
import { useCurrentTime } from './useCurrentTime';

function ClockApp() {
    const date = useCurrentTime(); // 逻辑就在这一行
    return (
        <>
      <div className="clock-container">
      <h1>Timer</h1>
      <h2 className="time-display">
        It is {date.toLocaleTimeString()}
      </h2>
    </div>
      <div>
        这两个函数是 JavaScript 原生的**定时器 API**，在 React 开发中常用于处理随时间自动变化的任务（如倒计时、时钟、轮询数据等）。

我们可以把它们想象成闹钟的**“设定”**与**“关闭”**。

---

### 1. `setInterval(updateClock, 1000)`

**用途：开启循环任务**

这行代码的作用是：**每隔指定的时间，就自动执行一次某个函数。**

* **第一个参数 (`updateClock`)**：这是你想要执行的“动作”。在这里，就是获取当前时间并更新状态。
* **第二个参数 (`1000`)**：间隔时间，单位是**毫秒**。`1000` 毫秒等于 1 秒。
* **返回值 (`timerId`)**：这非常重要。当你调用 `setInterval` 时，浏览器会返回一个**数字 ID**（就像一个存包处的号码牌）。你需要记住这个 ID，将来才能找到并关掉这个特定的定时器。

**在你代码中的逻辑：**

1. 组件挂载。
2. 启动定时器：嘿，浏览器，从现在起，每秒钟帮我运行一次 `updateClock`。
3. 浏览器给了你一个 `timerId`。

---

### 2. `clearInterval(timerId)`

**用途：停止循环任务（清理）**

这行代码的作用是：**根据提供的 ID，彻底停止那个正在运行的定时器。**

**为什么要这么做？（防止“内存泄漏”）**
想象一下，如果你离开这个页面，组件被销毁了，但你没有执行 `clearInterval`：

* 那个定时器依然在浏览器的后台疯狂运行。
* 它每秒钟尝试去调用 `setDate`。
* 但此时 `FunctionalClock` 组件已经不存在了，这会导致程序报错或者消耗没必要的 CPU 资源。

---


---

### 总结比喻

* **`setInterval`**：就像你定了一个每隔 1 分钟响一次的**闹钟**。
* **`timerId`**：就是这个闹钟的**开关按钮**。
* **`clearInterval`**：就是当你打算睡觉或者离开房间时，**按下开关**让闹钟不再响。

如果你不按下那个开关（`clearInterval`），即便你离开了房间，闹钟也会一直响下去，直到电池耗尽（浏览器崩溃或资源浪费）。

**关于这个时钟组件，你还有其他想了解的吗？比如为什么 `date` 要放在 `useState` 里，而不是直接定义一个普通变量？**
      </div>
      </>
    );
  }
//
export default ClockApp;
