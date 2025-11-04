interface ExchangeRateProps {
  fromToken: string
  toToken: string
  rate: number
}

export const ExchangeRate = ({ fromToken, toToken, rate }: ExchangeRateProps) => {
  return (
    <div className="text-center text-muted-foreground text-sm py-2">
      1 {fromToken} = {rate} {toToken}
    </div>
  )
}
