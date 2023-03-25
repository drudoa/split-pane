import { useState } from "react";
// import "./App.css";
import SplitPane from "./components/my-splite-pane";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <SplitPane />
    </div>
  );
}

export default App;
