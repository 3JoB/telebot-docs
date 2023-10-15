---
title: Keyboards
layout: doc
---

# Keyboards

Telebot supports both kinds of keyboards Telegram provides: reply and inline keyboards. Any button can also act as endpoints for `Handle()`.

```go
var (
	// Universal markup builders.
	menu     = &tele.ReplyMarkup{ResizeKeyboard: true}
	selector = &tele.ReplyMarkup{}

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

b.Handle("/start", func(c *tele.Context) error {
	_, err := c.Send("Hello!", menu)
    return err
})

// On reply button pressed (message)
b.Handle(&btnHelp, func(c *tele.Context) error {
	_, err := c.Edit("Here is some help: ...")
    return err
})

// On inline button pressed (callback)
b.Handle(&btnPrev, func(c *tele.Context) error {
	return c.Respond()
})
```

You can use markup constructor for every type of possible button:

```go
r := b.NewMarkup()

// Reply buttons:
r.Text("Hello!")
r.Contact("Send phone number")
r.Location("Send location")
r.Poll(tele.PollQuiz)

// Inline buttons:
r.Data("Show help", "help") // data is optional
r.Data("Delete item", "delete", item.ID)
r.URL("Visit", "https://google.com")
r.Query("Search", query)
r.QueryChat("Share", query)
r.Login("Login", &tele.Login{...})
```