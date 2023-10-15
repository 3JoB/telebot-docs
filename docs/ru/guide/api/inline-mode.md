---
title: Inline Mode
layout: doc
---

# Inline Mode

So if you want to handle incoming inline queries you better plug the `tele.OnQuery` endpoint and then use the `Answer()` method to send a list of inline queries back. I think at the time of writing, Telebot supports all of the provided result types (but not the cached ones). This is what it looks like:

```go
b.Handle(tele.OnQuery, func(c *tele.Context) error {
	urls := []string{
		"http://photo.jpg",
		"http://photo2.jpg",
	}

	results := make(tele.Results, len(urls)) // []tele.Result
	for i, url := range urls {
		result := &tele.PhotoResult{
			URL:      url,
			ThumbURL: url, // required for photos
		}

		results[i] = result
		// needed to set a unique string ID for each result
		results[i].SetResultID(strconv.Itoa(i))
	}

	return c.Answer(&tele.QueryResponse{
		Results:   results,
		CacheTime: 60, // a minute
	})
})
```

There's not much to talk about really. It also supports some form of authentication through deep-linking. For that, use fields `SwitchPMText` and `SwitchPMParameter` of `QueryResponse`.