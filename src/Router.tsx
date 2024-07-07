import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PATH_PAGES } from "./constants/pages"
import Home from "./pages/Home"
import Learning from "./pages/Learning"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path={PATH_PAGES.root} element={<Home />} />
      <Route path={`${PATH_PAGES.root}/learning`} element={<Learning />} />
    </Routes>
  )
}

export default Router;