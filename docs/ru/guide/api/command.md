---
title: команда
layout: doc
---

# команда

When handling commands, Telebot supports both direct (`/command`) and group-like syntax (`/command@botname`) and will never deliver messages addressed to some other bot, even if [privacy mode](https://core.telegram.org/bots#privacy-mode) is off.

For simplified deep-linking, Telebot also extracts payload:

```go
// Command: /start <PAYLOAD>
b.Handle("/start", func(c *tele.Context) error {
	fmt.Println(c.Message().Payload) // <PAYLOAD>
})
```

For multiple arguments use:

```go
// Command: /tags <tag1> <tag2> <...>
b.Handle("/tags", func(c *tele.Context) error {
	tags := c.Args() // list of arguments splitted by a space
	for _, tag := range tags {
		// iterate through passed arguments
	}
})
```

TelebotE's new command processing directly processes strings instead of using regular expressions, which can greatly improve performance, and the payload can also return newline content.

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