import React from "react";
import logo from "./logo.svg";
import "./App.css";
import QuizComponent from "./components/quiz_component";

function App(props) {
  return (
    <div className="App">
      <QuizComponent {...props} />
    </div>
  );
}

export default App;
