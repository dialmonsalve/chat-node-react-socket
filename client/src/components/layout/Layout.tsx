import { Outlet } from "react-router-dom"
import { ChatProvider } from "../../context/chat/ChatProvider"
import { useAuthContext } from "../../hooks/useAuthContext"
import { Navbar } from "./Navbar"

export const Layout = () => {
  const {user} =useAuthContext()
  return (
    <ChatProvider user={user}>

    <Navbar />
    <main className="container" >
      <Outlet />
    </main>
  </ChatProvider>
  )
}
