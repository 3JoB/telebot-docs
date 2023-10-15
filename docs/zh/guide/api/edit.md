---
title: 編輯
page: doc
---

# 編輯

如果要編輯一些現有消息，則實際上不需要存儲原始 `*Message`對象。 實際上，在編輯時，電報僅需要`chat_id`和`message_id`。 因此，您實際上並不需要整個消息。 另外，您可能需要在數據庫中存儲對某些消息的引用，因此我認為任何GO結構都可以作為電報消息，實現`Editable`:
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

例如，類型為可編輯。以下是Telebot提供的type實現:
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
何必呢?好吧，它允許您執行以下操作:
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

我發現它非常整潔。 值得注意的是，在此時間點，編輯家庭中存在另一種方法 `EditCaption()`，這種方法的用途相當罕見，因此我沒有費心將其包含到`Edit()`中，就像我對`SendAlbum()`所做的那樣，因為它不可避免地會導致不必要的複雜化。

```go
var m *Message

// change caption of a photo, audio, etc.
bot.EditCaption(m, "new caption")
```