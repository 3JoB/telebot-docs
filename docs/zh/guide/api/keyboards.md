---
title: 鍵盤
layout: doc
---

# 鍵盤

Crare支持兩種鍵盤Telegram提供：回復和內聯鍵盤。 任何按鈕也可以充當 `Handle()` 的端點。

```go
var (
	// Universal markup builders.
	menu     = &crare.ReplyMarkup{ResizeKeyboard: true}
	selector = &crare.ReplyMarkup{}

	// Reply buttons.
	btnHelp     = menu.Text("ℹ Help")
	btnSettings = menu.Text("⚙ Settings")

	// Inline buttons.
	//
	// Pressing it will cause the client to
	// send the bot a callback.
	//
	// Make sure Unique stays unique as per button kind
	// since it's required for callback routing to work.
	//
	btnPrev = selector.Data("⬅", "prev", ...)
	btnNext = selector.Data("➡", "next", ...)
)

menu.Reply(
	menu.Row(btnHelp),
	menu.Row(btnSettings),
)
selector.Inline(
	selector.Row(btnPrev, btnNext),
)

b.Handle("/start", func(c *crare.Context) error {
	_, err := c.Send("Hello!", menu)
    return err
})

// On reply button pressed (message)
b.Handle(&btnHelp, func(c *crare.Context) error {
	_, err := c.Edit("Here is some help: ...")
    return err
})

// On inline button pressed (callback)
b.Handle(&btnPrev, func(c *crare.Context) error {
	return c.Respond()
})
```

您可以對每種可能的按鈕類型使用標記構造函數:

```go
r := b.NewMarkup()

// Reply buttons:
r.Text("Hello!")
r.Contact("Send phone number")
r.Location("Send location")
r.Poll(crare.PollQuiz)

// Inline buttons:
r.Data("Show help", "help") // data is optional
r.Data("Delete item", "delete", item.ID)
r.URL("Visit", "https://google.com")
r.Query("Search", query)
r.QueryChat("Share", query)
r.Login("Login", &crare.Login{...})
```