---
title: контекст
layout: doc
---

# контекст

Контекст - это особый тип, который упаковал огромную обновленную структуру и представляет контекст текущего события.

Он предоставляет несколько программ справки, таких как: получить этот чат обновления, независимо от того, какое это обновление.

Пожалуйста, не звоните в контекст, который вы не должны звонить по желанию. Иногда он содержит большое количество недостаточно инициализированных указателей, что приведет к пустой аномалии указателя.

```go
b.Handle(tele.OnText, func(c *tele.Context) error {
	// All the text messages that weren't
	// captured by existing handlers.

	var (
		user = c.Sender()
		text = c.Text()
	)

	// Use full-fledged bot's functions
	// only if you need a result:
	msg, err := b.Send(user, text)
	if err != nil {
		return err
	}

	// Instead, prefer a context short-hand:
	return c.Send(text)
})

b.Handle(tele.OnChannelPost, func(c *tele.Context) error {
	// Channel posts only.
	msg := c.Message()
})

b.Handle(tele.OnPhoto, func(c *tele.Context) error {
	// Photos only.
	photo := c.Message().Photo
})

b.Handle(tele.OnQuery, func(c *tele.Context) error {
	// Incoming inline queries.
	return c.Answer(...)
})
```

Телебот удалил старый интерфейс и непосредственно обнажил в виде указателя. Кроме того, пожалуйста, не пытайтесь вывести контекст снаружи, потому что это пул, и он будет переработан после окончания каждой обработки.

Вы можете найти доступные события обработчика в [Здесь](https://pkg.go.dev/github.com/3JoB/telebot/v2#pkg-constants).