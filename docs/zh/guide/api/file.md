---
title: 文件
layout: doc
---

# 文件
>BotAPI僅允許下載最大50MB和上傳20MB的文件。
>
>雖然可以使用自定義BotAPI伺服器來解除這一限制，但我並不推薦，如果你要從BotAPI外部訪問文件的話。

Crare允許上傳(從磁盤或通過URL)和下載(從Telegram) 機器人范圍內的文件。此外，發送任何類型的媒體並創建的文件會自動將文件從磁盤上傳到Telegram。

### 上傳
```go
a := &crare.Audio{File: crare.FromDisk("file.ogg")}

fmt.Println(a.OnDisk()) // true
fmt.Println(a.InCloud()) // false

// Will upload the file from disk and send it to the recipient
b.Send(recipient, a)

// Next time you'll be sending this very *Audio, Crare won't
// re-upload the same file but rather utilize its Telegram FileID
b.Send(otherRecipient, a)

fmt.Println(a.OnDisk()) // true
fmt.Println(a.InCloud()) // true
fmt.Println(a.FileID) // <Telegram file ID>
```

### 下載
```go
b.Download(c.Message().Document, "doc.txt")
```