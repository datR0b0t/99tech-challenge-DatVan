import type { Token } from '../../types/swap'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'

interface TokenInputProps {
  label: string
  amount: string
  token?: Token
  tokens?: Token[]
  balance?: number
  minReceived?: number
  readOnly?: boolean
  disabled?: boolean
  error?: string
  onAmountChange?: (value: string) => void
  onTokenChange?: (tokenSymbol: string) => void
}

export const TokenInput = ({
  label,
  amount,
  token,
  tokens: tokensProp,
  balance,
  readOnly = false,
  disabled = false,
  error,
  onAmountChange,
  onTokenChange,
}: TokenInputProps) => {
  return (
    <div className="bg-swap-input-bg rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-muted-foreground text-sm">{label}</span>
        {balance !== undefined && (
          <span className="text-foreground/80 text-sm">
            Balance: <span className="font-semibold">{balance.toLocaleString()}</span>
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange?.(e.target.value)}
          placeholder="0.00"
          readOnly={readOnly || disabled}
          disabled={disabled}
          aria-invalid={!!error}
          className="bg-transparent text-2xl sm:text-3xl md:text-4xl font-semibold text-card-foreground outline-none flex-1 placeholder:text-muted-foreground/50 min-w-0"
        />
            <Select value={token?.symbol ?? ''} onValueChange={(val) => onTokenChange?.(val)} disabled={disabled}>
              <SelectTrigger className={`bg-swap-button-bg hover:bg-swap-button-hover px-1 sm:px-2 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold w-auto min-w-[50px] ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
                <SelectValue placeholder="Select">
                  {token ? (
                    <div className="flex items-center gap-2">
                      <img src={token.icon} alt={token.name} className=" w-6 h-6 rounded-full" />
                      <span>{token.name}</span>
                    </div>
                  ) : (
                    <span>Select</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-swap-button-bg rounded-2xl">
                {(tokensProp ?? []).map((t) => (
                  <SelectItem key={t.symbol} value={t.symbol}>
                    <div className="flex items-center gap-2">
                      <img src={t.icon} alt={t.name} className="w-5 h-5 rounded-full" />
                      <span>{t.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          
      </div>

      {error && error.length > 0 && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      
    </div>
  )
}

