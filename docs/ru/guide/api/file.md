---
title: File
layout: doc
---

# File

>BotAPI only allows downloading files up to 50MB and uploading files up to 20MB.
>
>While it's possible to use a custom BotAPI server to lift this restriction, I don't recommend it if you want to access files from outside BotAPI.

Telebot allows to both upload (from disk or by URL) and download (from Telegram) files in bot's scope. Also, sending any kind of media with a File created from disk will upload the file to Telegram automatically:

### Upload
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

### Download
```go
b.Download(c.Message().Document, "doc.txt")
```