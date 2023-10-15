---
title: 内联模式
layout: doc
---

# 内联模式

因此，如果要处理传入的内联查询，最好插入终结点，然后使用该方法发送内联查询列表 返回。我认为在撰写本文时，Telebot 支持所有提供的结果 类型（但不是缓存的类型）。这是它的样子：tele.OnQueryAnswer()

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

真的没什么好谈的。它还支持某种形式的身份验证通过深度链接。为此，请使用字段和 .`SwitchPMText` `SwitchPMParameter` `QueryResponse`