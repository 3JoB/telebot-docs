---
title: Poller
layout: doc
---

## Poller
Crare doesn't really care how you provide it with incoming updates, as long
as you set it up with a Poller, or call ProcessUpdate for each update:

```go
// Poller is a provider of Updates.
//
// All pollers must implement Poll(), which accepts bot
// pointer and subscription channel and start polling
// synchronously straight away.
type Poller interface {
	// Poll is supposed to take the bot object
	// subscription channel and start polling
	// for Updates immediately.
	//
	// Poller must listen for stop constantly and close
	// it as soon as it's done polling.
	Poll(b *Bot, updates chan Update, stop chan struct{})
}