import "./App.css";
import FeedbackForm from "./FeedbackForm";

function App() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <div className="App">
      <a>Little Lemon Restaurant</a>
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
