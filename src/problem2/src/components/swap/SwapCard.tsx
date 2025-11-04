import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { TokenInput } from './TokenInput'
import { SwapButton } from './SwapButton'
import { ExchangeRate } from './ExchangeRate'
import { useSwap } from '../../hooks/useSwap'
import { Spinner } from '../ui/spinner'

export const SwapCard = () => {
  const {
    tokens,
    payAmount,
    receiveAmount,
    balance,
    selectedPayToken,
    selectedReceiveToken,
    exchangeRate,
    error,
    isLoading,
    handlePayAmountChange,
    handleSwapTokens,
    handleTransfer,
    handlePayTokenChange,
    handleReceiveTokenChange
  } = useSwap()

  return (
    <Card className="w-full max-w-[520px] bg-swap-card-bg border-border text-card-foreground">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <span className="text-xl sm:text-2xl font-bold text-swap-primary">SWAP</span>
      </CardHeader>
      
      <CardContent className="space-y-4 px-4 sm:px-6">
        {/* You Pay Section */}
        <div className="space-y-4">
          <TokenInput
            label="You pay"
            amount={payAmount}
            token={selectedPayToken}
            tokens={tokens}
            balance={balance}
            error={error}
            disabled={isLoading}
            onAmountChange={handlePayAmountChange}
            onTokenChange={handlePayTokenChange}
          />
        </div>

        {/* Swap Button */}
        <SwapButton onClick={handleSwapTokens} />

        {/* You Receive Section */}
        <TokenInput
          label="You receive"
          amount={receiveAmount}
          token={selectedReceiveToken}
          tokens={tokens}
          minReceived={0}
          readOnly
          disabled={isLoading}
          onTokenChange={handleReceiveTokenChange}
        />

        {/* Exchange Rate */}
        {selectedPayToken && selectedReceiveToken && (
          <ExchangeRate
            fromToken={selectedPayToken.name}
            toToken={selectedReceiveToken.name}
            rate={exchangeRate}
          />
        )}
      </CardContent>

      <CardFooter className="px-4 sm:px-6 pb-6">
        <Button
          className="w-full bg-swap-primary hover:bg-swap-primary-hover text-black font-bold text-base sm:text-lg py-5 sm:py-6 rounded-xl transition-colors"
          onClick={handleTransfer}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner />
              Transfering...
            </>
          ) : (
            'Transfer'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
