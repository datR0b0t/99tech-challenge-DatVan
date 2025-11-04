import { ArrowDownUp } from 'lucide-react'

interface SwapButtonProps {
  onClick: () => void
}

export const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <div className="flex justify-center -my-2 relative z-10">
      <button 
        onClick={onClick}
        className="bg-swap-primary hover:bg-swap-primary-hover p-3 rounded-xl transition-colors"
        aria-label="Swap tokens"
      >
        <ArrowDownUp className="w-5 h-5 text-black" />
      </button>
    </div>
  )
}
