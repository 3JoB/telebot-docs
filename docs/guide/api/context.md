---
title: Context
layout: doc
---

# Context

Context is a special type that wraps a huge update structure and represents the context of the current event. It provides several helpers, which allow getting, for example, the chat that this update had been sent in, no matter what kind of update this is.

Please do not call the context that should not be called at will. It sometimes contains a large number of uninitialized pointers, which will cause a null pointer exception.

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

Crare removed the old context interface and exposed it directly as a pointer. Also, please don't try to take the context outside, as it is pooled and will be recycled after each processing.

You can find the available Handler events [here](https://pkg.go.dev/gopkg.in/crare#pkg-constants).