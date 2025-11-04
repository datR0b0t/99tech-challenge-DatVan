import type { Token, APIResponse } from "../types";

const url = import.meta.env.VITE_PRICE_API_URL as string;
const iconUrl = import.meta.env.VITE_ICON_BASE_URL as string;

export const TokenApi = {
    async fetchToken() : Promise<APIResponse<Token[]>> {
        if (!url) {
            return {
                data: [],
                error: "VITE_PRICE_API_URL is not defined"
            }
        }
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const priceData: {currency: string, date: string, price: number}[] = await res.json();
            const tokenMap = new Map<string, {date: string, price: number}>();
            
            priceData.forEach(price => {
                const existing = tokenMap.get(price.currency);
                if (!existing || price.date > existing.date) {
                    tokenMap.set(price.currency, {date: price.date, price: price.price})
                }

            })
            const tokens: Token[] = [];
            
            tokenMap.forEach((value, key) => {
                tokens.push({
                    symbol: key,
                    name: key,
                    icon: `${iconUrl}/${key}.svg`,
                    price: value.price
                })
            })
            return {
                data: tokens,
            }
        } catch (error) {
            console.log("Error fetching tokens", error)
            return {
                data: [],
                error: "Error fetching tokens"
            }
        }
    }
}
            
            