// App.jsx or wherever you define routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostList } from "./Components/PostList";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Components/Login";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Login />} />
          <Route path="/postList" element={<PostList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
