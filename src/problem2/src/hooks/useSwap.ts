import { useState, useCallback, useEffect, useMemo } from 'react'
import type { Token } from '../types/swap'
import { TokenApi } from '@/services/api'
import { toast } from 'sonner'


export const useSwap = () => {
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await TokenApi.fetchToken()
      if (response.error) {
        console.error('Error fetching tokens:', response.error)
        return
      }
      setTokens(response.data)
    }
    fetchTokens()
  }, [])

  const [selectedPayToken, setSelectedPayToken] = useState<Token | undefined>(undefined)
  const [selectedReceiveToken, setSelectedReceiveToken] = useState<Token | undefined>(undefined)

  useEffect(() => {
    if (tokens.length > 0) {
      setSelectedPayToken((prev) => prev ?? tokens[0])
      setSelectedReceiveToken((prev) => prev ?? tokens[1] ?? tokens[0])
    }
  }, [tokens])
  const [payAmount, setPayAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const balance = 1000
  const [error, setError] = useState('')

  const exchangeRate = useMemo(() => {
    if (!selectedPayToken || !selectedReceiveToken) {
      return 0
    }
    const payTokenPrice = selectedPayToken.price
    const receiveTokenPrice = selectedReceiveToken.price
    return payTokenPrice/receiveTokenPrice
  }, [selectedPayToken, selectedReceiveToken])
 
  useEffect(() => {
    if (!selectedPayToken || !selectedReceiveToken) {
      return
    }
    if (payAmount === '') {
      setReceiveAmount('')
      setError('')
      return
    }
    const value = Number(payAmount)
    if (Number.isNaN(value)) {
      setError('Invalid amount')
      return
    }
    if (value > balance) {
      setError('Insufficient balance')
    } else if (value < 0) {
      setError('Amount must be greater than 0')
      return
    } else {
      setError('')
    }
    const payTokenPrice = selectedPayToken.price
    const receiveTokenPrice = selectedReceiveToken.price
    const amount = (value * payTokenPrice) / receiveTokenPrice
    setReceiveAmount(amount.toFixed(4))
  }, [payAmount, selectedPayToken, selectedReceiveToken])
  
  const handlePayAmountChange = useCallback((value: string) => {
    setPayAmount(value)
  }, [])


  const handleSwapTokens = () => {
    const temp = selectedPayToken
    setSelectedPayToken(selectedReceiveToken)
    setSelectedReceiveToken(temp)
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleTransfer = () => {
    if (payAmount === '') {
      setError('Amount is required')
      return
    }
    if (error) {
      toast.error(error)
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setPayAmount('')
      setReceiveAmount('')
      setError('')
      toast.success('Transfer successful',{
        description: `You swapped ${payAmount} ${selectedPayToken?.symbol} for ${receiveAmount} ${selectedReceiveToken?.symbol}`
      })
    }, 1500)
  }
  
  const handlePayTokenChange = (tokenSymbol: string) => {
    const token = tokens.find((token) => token.symbol === tokenSymbol)
    if (token) {
      setSelectedPayToken(token)
    }
  }
  const handleReceiveTokenChange = (tokenSymbol: string) => {
    const token = tokens.find((token) => token.symbol === tokenSymbol)
    if (token) {
      setSelectedReceiveToken(token)
    }
  }
  
  return {
    tokens,
    selectedPayToken,
    selectedReceiveToken,
    payAmount,
    receiveAmount,
    balance,
    exchangeRate,
    error,
    isLoading,
    handlePayAmountChange,
    handleSwapTokens,
    handleTransfer,
    handlePayTokenChange,
    handleReceiveTokenChange

    
  }
}

