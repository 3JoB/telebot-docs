---
title: 情境
layout: doc
---

# 情境

情境是一種特殊類型，它包裝了一個巨大的更新結構並表示當前事件的情境。

它提供了幾個幫助程序，例如: 獲取此更新已發送的聊天,無論這是什麼樣的更新。

請不要隨意調用不該調用的情境，它有時含有大量的未初始化指針，這將會導致空指針異常。

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

Telebot移除了舊的上下文接口並直接將指針暴露出來。另外，請不要嘗試將上下文帶到外部，因為它是池化的，在每個處理結束後都會被回收。

您可以在[此處](https://pkg.go.dev/github.com/3JoB/telebot/v2#pkg-constants)找到可用的Handler事件。