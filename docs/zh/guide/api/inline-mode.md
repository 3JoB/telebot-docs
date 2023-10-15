---
title: 內聯模式
layout: doc
---

# 內聯模式

因此，如果要處理傳入的內聯查詢，則更好地插入`tele.OnQuery`端點，然後使用`Answer()`方法將inline查詢列表發送回來。 我認為在撰寫本文時，Telebot支持所有提供的結果類型(但不能緩存)。 這就是它的樣子:

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

真的沒有什麼可談論的。 它還通過深鏈接來支持某種形式的身份驗證。 為此，使用`QueryResponse`的字段`SwitchPMText`和`SwitchPMParameter`。