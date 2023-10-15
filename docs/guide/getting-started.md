---
title: Getting Started
layout: doc
---

# Getting Started
Let's take a look at the minimal Telebot setup:
```go
package main

import (
	"log"
	"os"
	"time"

	tele "github.com/3JoB/telebot/v2"
)

func main() {
	pref := tele.Settings{
		Token:  os.Getenv("TOKEN"),
		Poller: &tele.LongPoller{Timeout: 10 * time.Second},
	}

	b, err := tele.NewBot(pref)
	if err != nil {
		log.Fatal(err)
		return
	}

	b.Handle("/hello", func(c *tele.Context) error {
		c.Send("Hello!")
		return nil
	})

	b.Start()
}

```

Simple, innit? Telebot's routing system takes care of delivering updates to their endpoints, so in order to get to handle any meaningful event, all you got to do is just plug your function into one of the Telebot-provided endpoints. You can find the full list [here](https://godoc.org/github.com/3JoB/telebot/v2#pkg-constants).

There are dozens of supported endpoints (see package consts). Let me know if you'd like to see some endpoint or endpoint ideas implemented. This system is completely extensible, so I can introduce them without breaking backwards compatibility.