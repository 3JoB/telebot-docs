---
title: 命令
layout: doc
---

# 命令

处理命令时，Telebot 支持直接 (`/command`) 和类组语法 (`/command@botname`)，并且永远不会向其他机器人传递消息，即使[隐私模式](https://core.telegram.org/bots#privacy-mode)关闭也是如此。

为了简化深度链接，Telebot 还提取有效负载:
```go
// Command: /start <PAYLOAD>
b.Handle("/start", func(c *tele.Context) error {
	fmt.Println(c.Message().Payload) // <PAYLOAD>
})
```
对于多个参数，请使用:
```go
// Command: /tags <tag1> <tag2> <...>
b.Handle("/tags", func(c *tele.Context) error {
	tags := c.Args() // list of arguments splitted by a space
	for _, tag := range tags {
		// iterate through passed arguments
	}
})
```

TelebotE的命令处理直接处理字符串，而不是Telebot的经典正则处理，这样能大幅提升性能，并且payload也可以传回换行后的内容。

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