---
title: 中介軟體
layout: doc
---

# 中介軟體

Crare 有一種簡單且可識別的方式來設置中介軟體 - 可以訪問的鍊式函數，在處理程序執行之前調用 `Context`。

導入 `middleware` 包以獲得一些基本的開箱即用的中介軟體實現:

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

自定義中介軟體示例:
```go
// AutoResponder automatically responds to every callback update.
func AutoResponder(c *crare.Context) error {
	if c.Callback() != nil {
		defer c.Respond()
	}
	return c.Next() // continue execution chain
}
```

`c.Next()` 可以使中介軟體减少嵌套返回:

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

怎麼樣，沒有那麼多的嵌套返回，看起來是不是很簡潔?

提示一下，每個組，最好在中介軟體全部導入後再導入處理程序，否則後面的中介軟體將會丟失，我會在未來解決這個問題。