---
title: Inline Mode
layout: doc
---

# Inline Mode

So if you want to handle incoming inline queries you better plug the `crare.OnQuery` endpoint and then use the `Answer()` method to send a list of inline queries back. I think at the time of writing, Crare supports all of the provided result types (but not the cached ones). This is what it looks like:

```go
b.Handle(crare.OnQuery, func(c *crare.Context) error {
	urls := []string{
		"http://photo.jpg",
		"http://photo2.jpg",
	}

	results := make(crare.Results, len(urls)) // []crare.Result
	for i, url := range urls {
		result := &crare.PhotoResult{
			URL:      url,
			ThumbURL: url, // required for photos
		}

		results[i] = result
		// needed to set a unique string ID for each result
		results[i].SetResultID(strconv.Itoa(i))
	}

	return c.Answer(&crare.QueryResponse{
		Results:   results,
		CacheTime: 60, // a minute
	})
})
```

There's not much to talk about really. It also supports some form of authentication through deep-linking. For that, use fields `SwitchPMText` and `SwitchPMParameter` of `QueryResponse`.