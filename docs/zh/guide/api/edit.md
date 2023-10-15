---
title: 编辑
page: doc
---

# 编辑
如果您想编辑某些现有消息，则实际上不需要存储原始对象。 事实上，编辑后，Telegram 只需要和。所以你并不真正需要整个消息。

另外，您可能希望在数据库中存储对某些消息的引用，因此我认为任何Go结构都可以作为 Telegram 消息进行编辑，以实现:`*Message` `chat_id` `message_id` `Editable`

```go
// Editable is an interface for all objects that
// provide "message signature", a pair of 32-bit
// message ID and 64-bit chat ID, both required
// for edit operations.
//
// Use case: DB model struct for messages to-be
// edited with, say two columns: msg_id,chat_id
// could easily implement MessageSig() making
// instances of stored messages editable.
type Editable interface {
	// MessageSig is a "message signature".
	//
	// For inline messages, return chatID = 0.
	MessageSig() (messageID int, chatID int64)
}
```

例如，类型为可编辑。以下是Telebot提供的type实现:
```go
// StoredMessage is an example struct suitable for being
// stored in the database as-is or being embedded into
// a larger struct, which is often the case (you might
// want to store some metadata alongside, or might not.)
type StoredMessage struct {
	MessageID int   `sql:"message_id" json:"message_id"`
	ChatID    int64 `sql:"chat_id" json:"chat_id"`
}

func (x StoredMessage) MessageSig() (int, int64) {
	return x.MessageID, x.ChatID
}
```
何必呢？好吧，它允许您执行以下操作:
```go
// just two integer columns in the database
var msgs []tele.StoredMessage
db.Find(&msgs) // gorm syntax

for _, msg := range msgs {
	bot.Edit(&msg, "Updated text")
	// or
	bot.Delete(&msg)
}
```

我发现它非常整洁。 值得注意的是，此时Edit系列中还存在另一种方法，这种方法的用途相当罕见，因此我没有费心将其包含到其中，就像我所做的那样，因为它不可避免地会导致不必要的复杂化。`EditCaption()` `Edit()` `SendAlbum()`
```go
var m *Message

// change caption of a photo, audio, etc.
bot.EditCaption(m, "new caption")
```