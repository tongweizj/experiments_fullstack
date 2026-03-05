import { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true, // 显示所有
  Active: (task) => !task.completed, // 只显示未完成
  Completed: (task) => task.completed, // 只显示已完成
};

// 获取对象的所有 Key (即 ['All', 'Active', 'Completed'])
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState([
    { id: nanoid(), name: 'Eat', completed: true },
    { id: nanoid(), name: 'Sleep', completed: false },
    { id: nanoid(), name: 'Repeat', completed: false },
  ]);
  const [filter, setFilter] = useState('All'); // 默认为 'All'

  // 1. 定义添加任务的函数
  function addTask(name) {
    const newTask = { id: nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]); // 使用展开运算符保持不可变性
  }

  // 1. 删除函数
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // 2. 编辑函数 (更新任务名称)
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  // 2. 渲染三个过滤按钮
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter} // 如果名字匹配，设为激活状态
      setFilter={setFilter} // 传下修改状态的函数
    />
  ));
  return (
    <>
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={addTask} />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading">3 tasks remaining</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    </>
  );
}

export default App;
