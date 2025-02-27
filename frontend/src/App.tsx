import { Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import AuthLayout from "./layouts/AuthLayout"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
