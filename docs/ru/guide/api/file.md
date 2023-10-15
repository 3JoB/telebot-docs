---
title: 文件
layout: doc
---

# 文件
**文件的下载方法目前仍然处于一个混乱的状态。**

>BotAPI仅允许下载最大50MB和上传20MB的文件。
>
>虽然可以使用自定义BotAPI服务器来解除这一限制，但我并不推荐，如果你要从BotAPI外部访问文件的话。

Telebot允许上传(从磁盘或通过URL)和下载(从Telegram) 机器人范围内的文件。此外，发送任何类型的媒体并创建的文件会自动将文件从磁盘上传到Telegram。

### 上传
```go
a := &tele.Audio{File: tele.FromDisk("file.ogg")}

fmt.Println(a.OnDisk()) // true
fmt.Println(a.InCloud()) // false

// Will upload the file from disk and send it to the recipient
b.Send(recipient, a)

// Next time you'll be sending this very *Audio, Telebot won't
// re-upload the same file but rather utilize its Telegram FileID
b.Send(otherRecipient, a)

fmt.Println(a.OnDisk()) // true
fmt.Println(a.InCloud()) // true
fmt.Println(a.FileID) // <Telegram file ID>
```

### 下载
目前下载方法会直接将文件保留到系统缓存目录并在所指定的位置创建一个软链接，这是受限于糟糕的io.Reader接口而创建的糟糕的方法，会在将来更改行为。
```go
b.Download(c.Message().Document, "doc.txt")
```