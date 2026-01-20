import { Applications } from "./components/kubapps/applications"
import Footer from "./components/kubapps/footer"
import { NavBar } from "./components/kubapps/navbar"
import { PodProvider } from "./contexts/PodContext"

function App() {
  return (
    <PodProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Large animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          
          {/* Medium bubbles */}
          <div className="absolute top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-200/25 to-blue-300/25 rounded-full mix-blend-multiply filter blur-lg animate-float animation-delay-1000"></div>
          <div className="absolute bottom-32 right-1/4 w-32 h-32 bg-gradient-to-br from-violet-200/25 to-purple-300/25 rounded-full mix-blend-multiply filter blur-lg animate-float animation-delay-3000"></div>
          <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-indigo-200/20 to-cyan-200/20 rounded-full mix-blend-multiply filter blur-lg animate-float animation-delay-5000"></div>
          
          {/* Small bubbles */}
          <div className="absolute top-16 left-1/3 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-indigo-400/40 rounded-full mix-blend-multiply filter blur-md animate-bubble animation-delay-500"></div>
          <div className="absolute bottom-20 left-1/5 w-12 h-12 bg-gradient-to-br from-purple-300/40 to-pink-400/40 rounded-full mix-blend-multiply filter blur-md animate-bubble animation-delay-1500"></div>
          <div className="absolute top-1/4 left-2/3 w-20 h-20 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 rounded-full mix-blend-multiply filter blur-md animate-bubble animation-delay-2500"></div>
          <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-indigo-300/40 to-violet-400/40 rounded-full mix-blend-multiply filter blur-md animate-bubble animation-delay-3500"></div>
          <div className="absolute top-2/3 left-1/6 w-18 h-18 bg-gradient-to-br from-blue-300/35 to-cyan-400/35 rounded-full mix-blend-multiply filter blur-md animate-bubble animation-delay-4500"></div>
          
          {/* Tiny floating bubbles */}
          <div className="absolute top-1/5 right-1/5 w-8 h-8 bg-gradient-to-br from-blue-400/50 to-indigo-500/50 rounded-full mix-blend-multiply animate-rise animation-delay-800"></div>
          <div className="absolute bottom-1/4 left-1/2 w-6 h-6 bg-gradient-to-br from-purple-400/50 to-pink-500/50 rounded-full mix-blend-multiply animate-rise animation-delay-1800"></div>
          <div className="absolute top-1/2 right-1/6 w-10 h-10 bg-gradient-to-br from-cyan-400/45 to-blue-500/45 rounded-full mix-blend-multiply animate-rise animation-delay-2800"></div>
          <div className="absolute bottom-1/5 right-2/3 w-7 h-7 bg-gradient-to-br from-indigo-400/50 to-violet-500/50 rounded-full mix-blend-multiply animate-rise animation-delay-3800"></div>
          <div className="absolute top-3/4 left-1/4 w-9 h-9 bg-gradient-to-br from-blue-400/45 to-cyan-500/45 rounded-full mix-blend-multiply animate-rise animation-delay-4800"></div>
        </div>
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <NavBar />
          <Applications />
          <Footer />
        </div>
      </div>
    </PodProvider>
  )
}

export default App
