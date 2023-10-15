---
title: Sendable
page: doc
---

# Sendable

Send無疑是Telebot中最重要的方法。 `Send()` 接受一個收件人(可以是用戶,組或頻道)和一個可發送對象。除了Telebot提供的媒體類型(照片、音頻、視頻等)之外的其他類型都是可發送的。如果您創建自己的複合類型，並且它們滿足Sendable接口，Telebot將能夠將它們發送出去。

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

當時唯一不適合`Send()`的類型是Album，這是有原因的。 `Album`是不久前添加的，因此出於向後兼容性的考慮，它們有點奇怪。事實上，可以發送，但從未收到。相反，Telegram 返回一條 `[]Message`，對應相冊中的每個媒體對象:
```go
p := &tele.Photo{File: tele.FromDisk("chicken.jpg")}
v := &tele.Video{File: tele.FromURL("http://video.mp4")}

msgs, err := b.SendAlbum(user, tele.Album{p, v})
```

# SendOption

發送選項是您可以傳遞給`Send()`，`Edit()`和朋友作為可選參數的對象和標誌（遵循收件人和文本/媒體）。 最重要的是稱為`SendOptionsSend()`，它使您可以控制電報支持的消息的所有屬性。 唯一的缺點是有時使用的不便，因此Send支持多個速記:

```go
// regular send options
b.Send(user, "text", &tele.SendOptions{
	// ...
})

// ReplyMarkup is a part of SendOptions,
// but often it's the only option you need
b.Send(user, "text", &tele.ReplyMarkup{
	// ...
})

// flags: no notification && no web link preview
b.Send(user, "text", tele.Silent, tele.NoPreview)
```

您可以在[此處](https://pkg.go.dev/github.com/3JoB/telebot/v2#Option)找到支持的選項標誌的完整列表。