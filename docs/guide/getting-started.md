---
title: Getting Started
layout: doc
---

# Getting Started
Let's take a look at the minimal Crare setup:
```go
package main

import (
	"log"
	"os"
	"time"

	"gopkg.in/crare"
)

func main() {
	pref := crare.Settings{
		Token:  os.Getenv("TOKEN"),
		Poller: &crare.LongPoller{Timeout: 10 * time.Second},
	}

	b, err := crare.NewBot(pref)
	if err != nil {
		log.Fatal(err)
		return
	}

	b.Handle("/hello", func(c *crare.Context) error {
		c.Send("Hello!")
		return nil
	})

	b.Start()
}

```

Simple, innit? Crare's routing system takes care of delivering updates to their endpoints, so in order to get to handle any meaningful event, all you got to do is just plug your function into one of the Crare-provided endpoints. You can find the full list [here](https://godoc.org/gopkg.in/crare#pkg-constants).

There are dozens of supported endpoints (see package consts). Let me know if you'd like to see some endpoint or endpoint ideas implemented. This system is completely extensible, so I can introduce them without breaking backwards compatibility.