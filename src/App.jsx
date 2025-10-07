import { BrowserRouter, Route, Routes } from "react-router"
import { Navbar } from "./Components/Navbar"
import { PostList } from "./Components/PostList"
import { AddPostForm } from "./AddPost"
import { Login } from "./Components/Login"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="postList" element={<PostList />} />
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
