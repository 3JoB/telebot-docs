---
title: бревно
layout: doc
---

# бревно

The idea of Logger comes from https://github.com/tucnak/telebot/issues/619.

The Logger interface allows you to customize log wrappers for TEP, which uses Zerolog-based wrappers by default.

```go
type Logger interface {
	Println(a ...any)
	Panicf(format string, a ...any)
	Printf(format string, a ...any)
    // OnError was originally in the Settings structure and was separated into Logger in v2.
	OnError(error, *Context)
}
```

It is very concise, because Crare usually does not need so many methods, so it only defines some of the most important methods, and then there are none. It can also be called through the Bot pointer.

Like: 
```go
func main(){
    .......
    b.Logger().Println("my crare bot")
}
```

Or:
```go
func K(c *crare.Context) error {
    c.b.Logger().Println("i like cookie")
    return nil
}
```

