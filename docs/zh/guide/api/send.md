---
title: 发送
page: doc
---

# Sendable

Send无疑是Telebot中最重要的方法。 `Send()` 接受一个收件人(可以是用户,组或频道)和一个可发送对象。 除了Telebot提供的媒体类型(照片、音频、视频等)之外的其他类型都是可发送的。 如果您创建自己的复合类型，并且它们满足Sendable接口，Telebot将能够将它们发送出去。

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

当时唯一不适合`Send()`的类型是Album，这是有原因的。 `Album`是不久前添加的，因此出于向后兼容性的考虑，它们有点奇怪。 事实上，可以发送，但从未收到。 相反，Telegram 返回一条 `[]Message`，对应相册中的每个媒体对象:
```go
p := &tele.Photo{File: tele.FromDisk("chicken.jpg")}
v := &tele.Video{File: tele.FromURL("http://video.mp4")}

msgs, err := b.SendAlbum(user, tele.Album{p, v})
```

# 发送选项

发送选项是您可以作为可选参数传递给 和 朋友的对象和标志（在收件人和文本/媒体之后）。 最重要的一个叫做 ，它可以让你控制 Telegram 支持的消息的所有属性。 唯一的缺点是有时使用起来比较不方便，所以支持多种简写: `Send()` `Edit()` `SendOptionsSend()`
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

您可以在[此处](https://pkg.go.dev/github.com/3JoB/telebot/v2#Option)找到支持的选项标志的完整列表。