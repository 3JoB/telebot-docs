---
title: Middleware
layout: doc
---

# Middleware

Crare has a simple and recognizable way to set up middleware - a chain of functions that you can access, calling `Context` before the handler is executed.

Import the `middleware` package to get some basic out-of-the-box middleware implementations:

```go
import "gopkg.in/crare.v1/middleware"
```

```go
// Global-scoped middleware:
b.Use(middleware.Logger())
b.Use(middleware.AutoRespond())

// Group-scoped middleware:
adminOnly := b.Group()
adminOnly.Use(middleware.Whitelist(adminIDs...))
adminOnly.Handle("/ban", onBan)
adminOnly.Handle("/kick", onKick)

// Handler-scoped middleware:
b.Handle(crare.OnText, onText, middleware.IgnoreVia())
```

Custom middleware example:
```go
// AutoResponder automatically responds to every callback update.
func AutoResponder(c *crare.Context) error {
	if c.Callback() != nil {
		defer c.Respond()
	}
	return c.Next() // continue execution chain
}
```

`c.Next()` can enable middleware to reduce nested returns:

Telebot:
```go
// AutoRespond returns a middleware that automatically responds
// to every callback.
func AutoRespond() tele.MiddlewareFunc {
	return func(next tele.HandlerFunc) tele.HandlerFunc {
		return func(c tele.Context) error {
			if c.Callback() != nil {
				defer c.Respond()
			}
			return next(c)
		}
	}
}
```

Crare:
```go
// AutoRespond returns a middleware that automatically responds
// to every callback.
func AutoRespond(c *crare.Context) error {
		if c.Callback() != nil {
			defer c.Respond()
		}
		return c.Next()
}
```

How about it, there are not so many nested returns, doesn’t it look very concise?

As a reminder, for each group, it is best to import the handler after all the middleware is imported, otherwise the subsequent middleware will be lost. I will solve this problem in the future.