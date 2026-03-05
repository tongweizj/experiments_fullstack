import React, { useState } from 'react';
export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  // 处理输入框变化
  function handleChange(e) {
    setNewName(e.target.value);
  }

  // 处理编辑提交
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName('');
    setEditing(false);
  }
  // --- 视图模板 ---

  // 1. 编辑状态的模板
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
        </button>
      </div>
    </form>
  );

  // 2. 普通状态的模板 (你原来的代码)
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)} // 直接调用
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
