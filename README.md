# kCalculator
練習Lexer跟Parser還有Binary Tree的專案

***

## 為什麼會想要做
看到一堆人在 [Discord](https://discord.gg/ct2ufag) 上面炫耀自己做的語言真的有點獸不了，所以想說也來嘗試一下

## 執行流程
輸入 > `Lexer` > `Parser` > `Executor`

### 輸入資料
可以支援加減乘除和括號優先順序的算式

### Lexer
第一次聽到這個名詞感覺蠻陌生的，
不過他負責的工作是把你輸入的文字給拆分成一個一個的 `Token`，這裡有個簡單的範例

```
kCalculator > 1 + 1
上面的就可以拆分成
1 => [整數, 1]
+ => [加號]
1 => [整數, 1]
```

### Parser
他的工作是負責把拆分好的 tokens 變成可以運算的算式，這東西花上了我一整天><

我的思路是把一個算式變成一顆Binary Tree

像是 `1 + 1` 可以變成

```
    __+__
   /     \
  1       1
```

### Executor

就負責執行上面的Binary Tree，看中間的operator是什麼來進行操作