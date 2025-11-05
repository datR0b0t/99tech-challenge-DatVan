# Computational inefficiencies and anti-patterns found in the code block given 
## 1. Missing type safety
**Problem**: `interface WalletBalance` is missing `blockchain` field, while it is used in `sortedBalances` filter function (line 38)
```
interface WalletBalance { 
    currency: string; 
    amount: number;
}
```

**Solution**: Add `blockchain` field to `interface WalletBalance`
```
interface WalletBalance { 
    currency: string; 
    amount: number;
    blockchain: string;
}
```
## 2. Wrong logic & variable reference
**Problem**: `lhsPriority` is used in `sortedBalances` filter function (line 38), but it is not defined
```
...
const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
...
```

**Solution**: Change lhsPriority to balancePriority
```
...
const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
...
```
## 3. Unclear filter logic
**Problem**: The filter logic is unclear, it filters out balances with `amount <= 0` and `priority > -99`. It should be the opposite. Because we want to show all balances with `amount > 0` and `priority > -99`.

**Solution**: Change the filter logic
```
...
const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99) {
		     if (balance.amount > 0) {
		       return true;
		     }
		  }
...
```

## 4. Missing return value in sort function
**Problem**: When priority is the same, the sort function does not return a value. It should return 0. 
```
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
```

**Solution**: Add `return 0` to sort function
```
.sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
		  return 0;
    });
```
## 5. Misuse of useMemo
**Problem**: The dependency array includes `prices`, but `prices` is not used in the computation. The entire sorting/filtering logic runs again when prices change, unnecessarily recomputing balances. It should be removed from the dependency array.

**Solution**: Remove `prices` from the dependency array
```
const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99) {
		     if (balance.amount > 0) {
		       return true;
		     }
		  }
	  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
		    return 0;
    });
  }, [balances]);
```
## 6. Using index as key
**Problem**: Using `index` as key is a anti-pattern, it can cause performance issues and unexpected behavior when the list is updated.

**Solution**: Use a unique identifier as key
```
const rows = sortedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })
```

## 7. Redundant formattedBalances variable and duplicate mapping
**Problem**: The code creates a new array of formatted balances and maps over it twice, once to format the balances and once to render the rows. It should be done in a single pass.
```
Original Code (Lines 56-61)

const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})
```

**Solution**: Remove `formattedBalances` variable and duplicate mapping. use `balance.amount.toFixed()` directly in the map function
```
const rows = sortedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    )
  })
```

### 8. getPriority declared inside the component
**Problem**: `getPriority` is declared inside the component, it should be moved outside the component to avoid redeclaration on every render.

**Solution**: Move `getPriority` outside the component
```
const getPriority = (blockchain: string): number => {
	switch (blockchain) {
		case 'Osmosis':
			return 100
		case 'Ethereum':
			return 50
		case 'Arbitrum':
			return 30
		case 'Zilliqa':
			return 20
		case 'Neo':
			return 20
		default:
			return -99
		}
	}
```






