import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";
import App from "./App";

describe("Feedback Form", () => {
  // describe 全局测试函数，
  // 第一个参数: 文本描述，用于说明测试目标以
  // 第二个参数: 测试需要执行的所有步骤。
  // 成功
  test("test1: renders a link that points to Little Lemon webpage", () => {
    render(<App />);
    const linkElement = screen.getByText("Little Lemon Restaurant");
    console.log("linkElement:", linkElement);
    expect(linkElement).toBeInTheDocument(); // 全局期望函数
  });
  // 失败
  test("test1: renders a link that points to Little Lemon webpage", () => {
    render(<App />);
    const linkElement = screen.getByText("Little Lemon1 Restaurant"); //故意写错的文本
    console.log("linkElement:", linkElement);
    expect(linkElement).toBeInTheDocument(); // 全局期望函数
  });

  test("test2: User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    // 准备工作
    const score = "3";
    const comment = "The pizza crust was too thick";

    const handleSubmit = jest.fn();
    // 用 jest 创建一个模拟函数
    // 模拟函数是一个特殊的函数，它允许用户跟踪外部代码如何调用特定函数
    render(<FeedbackForm onSubmit={handleSubmit} />); // 完成渲染页面

    // 在页面上操作
    const rangeInput = screen.getByLabelText(/Score:/); // 取到输入框
    console.log("rangeInput:", rangeInput);
    fireEvent.change(rangeInput, { target: { value: score } }); // 完成填写

    const textArea = screen.getByLabelText(/Comments:/); // 取到评论框
    fireEvent.change(textArea, { target: { value: comment } }); // 完成填写

    const submitButton = screen.getByRole("button"); // 取按钮
    fireEvent.click(submitButton); // 完成点击操作

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});
