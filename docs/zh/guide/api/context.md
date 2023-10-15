---
title: 上下文
layout: doc
---

# 上下文

上下文是一种特殊类型，它包装了一个巨大的更新结构并表示当前事件的上下文。

它提供了几个帮助程序，例如: 获取此更新已发送的聊天,无论这是什么样的更新。

请不要随意调用不该调用的上下文，它有时含有大量的未初始化指针，这将会导致空指针异常。

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

Telebot移除了旧的上下文接口并直接暴露出来作为指针来使用。另外，请不要尝试将上下文带到外部，因为它是池化的，在每个处理结束后都会被回收。

您可以在[此处](https://pkg.go.dev/github.com/3JoB/telebot/v2#pkg-constants)找到可用的Handler事件。