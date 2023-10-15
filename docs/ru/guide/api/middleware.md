---
title: 中间件
layout: doc
---

# 中间件

Telebot 有一种简单且可识别的方式来设置中间件 - 可以访问的链式函数，在处理程序执行之前调用 `Context`。

导入 `middleware` 包以获得一些基本的开箱即用的中间件实现:

```go
import "github.com/3JoB/telebot/v2/middleware"
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
b.Handle(tele.OnText, onText, middleware.IgnoreVia())
```

自定义中间件示例:
```go
// AutoResponder automatically responds to every callback update.
func AutoResponder(c *tele.Context) error {
	if c.Callback() != nil {
		defer c.Respond()
	}
	return c.Next() // continue execution chain
}
```

`c.Next()` 可以使中间件减少嵌套返回，如下:

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

TelebotE:
```go
// AutoRespond returns a middleware that automatically responds
// to every callback.
func AutoRespond(c *telebot.Context) error {
		if c.Callback() != nil {
			defer c.Respond()
		}
		return c.Next()
}
```

怎么样，没有那么多的嵌套返回，看起来是不是很简洁?

提示一下，每个组，最好在中间件全部导入后再导入处理程序，否则后面的中间件将会丢失，我会在未来解决这个问题。