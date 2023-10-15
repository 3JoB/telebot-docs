---
title: Editable
page: doc
---

# Editable
If you want to edit some existing message, you don't really need to store the original `*Message` object. In fact, upon edit, Telegram only requires `chat_id` and `message_id`. So you don't really need the Message as a whole. Also, you might want to store references to certain messages in the database, so I thought it made sense for any Go struct to be editable as a Telegram message, to implement `Editable`:

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

For example, `Message` type is Editable. Here is the implementation of `StoredMessage` type, provided by Telebot:

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

Why bother at all? Well, it allows you to do things like this:

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

I find it incredibly neat. Worth noting, at this point of time there exists another method in the Edit family, `EditCaption()` which is of a pretty rare use, so I didn't bother including it to `Edit()`, just like I did with `SendAlbum()` as it would inevitably lead to unnecessary complications.

```go
var m *Message

// change caption of a photo, audio, etc.
bot.EditCaption(m, "new caption")
```