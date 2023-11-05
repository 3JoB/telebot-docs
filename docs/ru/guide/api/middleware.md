---
title: промежуточное программное обеспечение
layout: doc
---

# промежуточное программное обеспечение

У Crare есть простой и узнаваемый способ установить функцию промежуточного программного обеспечения, к которой можно получить, и вызовать `Context` перед обработкой программы.

Импортируйте пакет `middleware`, чтобы получить базовую реализацию распаковки промежуточного программного обеспечения:

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

Пользовательский пример промежуточного программного обеспечения:
```go
// AutoResponder automatically responds to every callback update.
func AutoResponder(c *crare.Context) error {
	if c.Callback() != nil {
		defer c.Respond()
	}
	return c.Next() // continue execution chain
}
```

`c.Next()` может уменьшить вложенную доходность:

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

Как насчет этого, это выглядит очень кратко?

В каждой группе лучше всего импортировать программу обработки после импорта промежуточным программным обеспечением, в противном случае промежуточное программное обеспечение сзади будет потеряно, и я решу эту проблему в будущем.