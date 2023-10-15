---
title: 命令
layout: doc
---

# 命令

命令處理命令時，Telebot 支持直接(`/command`) 和類組語法(`/command@botname`)，並且永遠不會向其他機器人傳遞消息，即使[隱私模式](https://core.telegram .org/bots#privacy-mode)關閉也是如此。

為了簡化深度鏈接，Telebot 還提取有效負載:
```go
// Command: /start <PAYLOAD>
b.Handle("/start", func(c *tele.Context) error {
	fmt.Println(c.Message().Payload) // <PAYLOAD>
})
```

對於多個參數，請使用:

```go
// Command: /tags <tag1> <tag2> <...>
b.Handle("/tags", func(c *tele.Context) error {
	tags := c.Args() // list of arguments splitted by a space
	for _, tag := range tags {
		// iterate through passed arguments
	}
})
```

Telebot新的命令處理方法能直接處理字符串，而不是使用緩慢的正則表達式，這樣能大幅提升性能，並且payload也可以傳回換行後的內容。

## Benchmark
```
RE2: wasm, no cgo
REG: github.com/grafana/regexp
Strings: process()
cpu: 12th Gen Intel(R) Core(TM) i7-12700H
----
Benchmark_RE2-20            377274	            3039 ns/op	         592 B/op	      13 allocs/op
Benchmark_REG-20           1746291             685.1 ns/o              436 B/op	      3 allocs/op
Benchmark_Strings-20      28667738	       43.29 ns/op	         32 B/op	          1 allocs/op
```