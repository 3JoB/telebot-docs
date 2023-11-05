---
title: Sendable
page: doc
---

# Sendable

Send is undoubtedly the most important method in Crare. `Send()` accepts a recipient (which can be a user, group or channel) and a sendable object. In addition to the media types provided by Crare (photos, audio, videos, etc.), other types can be sent. If you create your own composite types, and they satisfy the Sendable interface, Crare will be able to send them out.

```go
// Sendable is any object that can send itself.
//
// This is pretty cool, since it lets bots implement
// custom Sendables for complex kinds of media or
// chat objects spanning across multiple messages.
type Sendable interface {
	Send(*Bot, Recipient, *SendOptions) (*Message, error)
}
```

The only type that wasn't suitable for `Send()` at the time was Album, and there was a reason for that. `Album` was added a while ago, so they are a bit odd for backwards compatibility reasons. In fact, it can be sent but never received. Instead, Telegram returns a `[]Message` for each media object in the album:

```go
p := &crare.Photo{File: crare.FromDisk("chicken.jpg")}
v := &crare.Video{File: crare.FromURL("http://video.mp4")}

msgs, err := b.SendAlbum(user, crare.Album{p, v})
```

# SendOptions

Send options are objects and flags you can pass to `Send()`, `Edit()` and friends as optional arguments (following the recipient and the text/media). The most important one is called `SendOptions`, it lets you control all the properties of the message supported by Telegram. The only drawback is that it's rather inconvenient to use at times, so `Send()` supports multiple shorthands:

```go
// regular send options
b.Send(user, "text", &crare.SendOptions{
	// ...
})

// ReplyMarkup is a part of SendOptions,
// but often it's the only option you need
b.Send(user, "text", &crare.ReplyMarkup{
	// ...
})

// flags: no notification && no web link preview
b.Send(user, "text", crare.Silent, crare.NoPreview)
```

Full list of supported option-flags you can find [here](https://pkg.go.dev/gopkg.in/crare.v1#Option).