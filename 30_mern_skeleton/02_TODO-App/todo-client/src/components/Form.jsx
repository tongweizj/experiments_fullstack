import React, { useState } from 'react';
function Form(props) {
  // 1. 创建本地状态来记录输入框的值
  const [name, setName] = useState('');

  // 2. 处理输入框变化
  function handleChange(e) {
    setName(e.target.value);
  }

  // 3. 处理表单提交
  function handleSubmit(e) {
    e.preventDefault(); // 防止页面刷新
    if (!name.trim()) return; // 防止添加空任务

    props.addTask(name); // 调用父组件传来的函数
    setName(''); // 提交后清空输入框
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name} // 绑定状态（受控组件）
        onChange={handleChange} // 监听变化
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
