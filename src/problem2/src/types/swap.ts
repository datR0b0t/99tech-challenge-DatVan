export interface Token {
  symbol: string;
  name: string;
  icon: string;
  price: number;
}

export interface APIResponse<T> {
    data: T;
    error?: string;
}

export interface SwapState {
  payAmount: string
  receiveAmount: string
  balance: number
  selectedPayToken: Token
  selectedReceiveToken: Token
  exchangeRate: number
}

export type PercentageOption = 15 | 25 | 50 | 75 | 100
