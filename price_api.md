# 通过 symbol 获取 asset price

使用 asset price api:

PRICE_API_URL 应该属于环境变量

```
const response = await fetch(`${PRICE_API_URL}/price/${symbol}`);
        const price: PriceInfo = await response.json();
        return price;
```

返回类型例子
```
{"symbol":"AAPL","open":"218.09","close":"218.09","price":"218.09"}
```