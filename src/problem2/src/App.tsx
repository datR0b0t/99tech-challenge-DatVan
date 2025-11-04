import './App.css'
import { SwapCard } from './components/swap'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className="dark bg-background flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[520px]">
        <SwapCard />
      </div>
      <Toaster richColors position="top-center"/>
    </div>
  )
}

export default App
