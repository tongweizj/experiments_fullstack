import "./App.css";
import { ThemeProvider } from "./ThemeContext";
import HomePage from "./home";
function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;

// homepage 是嵌套在 ThemeProvider component 里面的
