---
title: 開始製作第一個機器人
layout: doc
---

# 開始製作第一個機器人
讓我們來看看最小的Telebot範例:
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
怎麼樣?是不是很簡單?Telebot的路由系統負責提供更新到它們的端點，所以為了處理任何有意義的事件， 您所要做的就是將您的功能插入Telebot提供的功能之一端點.您可以在[此處](https://godoc.org/github.com/3JoB/telebot/v2#pkg-constants)找到完整清單.

有幾十個受支援的端點(請參閱包常數). 讓我知道如果您希望看到一些終結點或終結點想法實現.

這個系統是完全可擴展的，所以我可以在不中斷的情況下引入它們向後相容性.