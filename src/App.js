import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import FromLogin from "./pages/FromLogin";
import SignUpForm from "./pages/SignUpForm";
import FromTodo from "./pages/FromTodo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<FromLogin />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/FromTodo" element={<FromTodo />} />
        </Route>
      </Routes>
    </Router>
  );
}

// const rootElement = document.getElementById("root");
// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(<App />);
// }
// export default App;
