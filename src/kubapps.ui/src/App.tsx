import { Applications } from "./components/kubapps/applications"
import Footer from "./components/kubapps/footer"
import { NavBar } from "./components/kubapps/navbar"

function App() {
  return (
    <div className="">
      <NavBar />
      <Applications />
      <Footer />
    </div>
  )
}

export default App
