import { Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import AuthLayout from "./layouts/AuthLayout"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Chat from "./pages/chat"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element = {<Chat />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
