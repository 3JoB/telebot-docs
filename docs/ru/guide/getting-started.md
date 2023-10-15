---
title: Начните создавать своего первого робота
layout: doc
---

# Начните создавать своего первого робота
Давайте посмотрим на минимальный пример Telebot.:
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
		c.Send("Привет!")
		return nil
	})

	b.Start()
}

```
Как насчет этого? Довольно просто, правда? Система маршрутизации Telebot заботится о доставке обновлений на свои конечные точки, поэтому для обработки любых значимых событий все, что вам нужно сделать, это подключить свою функцию к одной из предоставленных Telebot конечных точек.

Полный список вы можете найти [здесь](https://godoc.org/github.com/3JoB/telebot/v2#pkg-constants).

Существуют десятки поддерживаемых конечных точек (см. константы пакета). Дайте мне знать, если есть какие-то конечные точки или идеи, которые вы хотели бы реализовать. Эта система полностью расширяема, поэтому я могу внедрить их, не нарушая обратной совместимости.