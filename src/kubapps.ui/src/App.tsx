import { Applications } from "./components/kubapps/applications"
import Footer from "./components/kubapps/footer"
import { NavBar } from "./components/kubapps/navbar"
import { PodProvider } from "./contexts/PodContext"

function App() {
  return (
    <PodProvider>
      <div className="">
        <NavBar />
        <Applications />
        <Footer />
      </div>
    </PodProvider>
  )
}

export default App
