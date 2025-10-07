import { BrowserRouter, Route, Routes } from "react-router"
import { Navbar } from "./Components/Navbar"
import { PostList } from "./Components/PostList"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<PostList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
