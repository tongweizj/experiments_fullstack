import React from 'react';

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      // 根据父组件传来的 isPressed 属性动态设置激活状态
      aria-pressed={props.isPressed}
      // 点击时调用父组件传来的设置过滤器的函数
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
