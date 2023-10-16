---
title: 網路
layout: doc
---

# 網路
网络接口为telebot提供网络操作包装。

预置了 `resty-ilo` (resty分支，net/http包装器) 和 `fasthttp` 包装。

```go
// It is forbidden to use multiple Netframe at the same time!
// It will cause programs to appear Panic!
type NetFrame interface {
	// Set up Json handler
	SetJsonHandle(v json.Json)

	// Create a new request object
	AcquireRequest() NetRequest
}

type NetRequest interface {
	// Set the request method to POST.
	MethodPOST()

	// Set the request method to GET。
	MethodGET()

	// Only fasthttp
	Body() io.Writer

	// Set Content-Type
	SetContentType(v string)

	// Set the requested URI address
	SetRequestURI(v string)

	// Set a Writer. When this Writer is passed in,
	// the data will be written directly to the Writer
	// after the request is completed instead of passing in the Response.
	SetWriter(w *bytes.Buffer)

	// Set a Writer. When this Writer is passed in,
	// the data will be written directly to the Writer
	// after the request is completed instead of passing in the Response.
	SetWriteCloser(v io.ReadWriteCloser)

	// Write data to the Body.
	Write(b []byte)

	// Write files to Body.
	WriteFile(content string, r io.Reader) error

	// Write the structure directly to the Body as json,
	// which will be processed by the interface.
	WriteJson(v any) error

	// Execute request.
	Do() (NetResponse, error)

	// Release() will clear the data in the current pointer.
	// It is recommended to call it within the Release() method instead
	// of calling it externally.
	Reset()

	// This method is generally not recommended because the built-in methods
	// have automatically called Release() at the end of the Do() method,
	// and only Response needs to be called manually.
	//
	// Release() will clear the data in the current pointer and put it back
	// into the pool. After release, the corresponding pointer should not be used anymore.
	Release()
}

type NetResponse interface {
	// StatusCode method returns the HTTP status code for the executed request.
	//
	//	Example: 200
	StatusCode() int

	// Example:
	//
	//	Raw: 200
	//	fmt.Println(resp.IsStatusCode(444))
	//
	//	Output: false
	IsStatusCode(v int) bool

	// If SetWriter() is called in req, this method will
	// not be set (unless the status code is not 200)
	Bytes() []byte

	// Release() will clear the data in the current pointer.
	// It is recommended to call it within the Release() method instead
	// of calling it externally.
	Reset()

	// Release() will clear the data in the current pointer and put it back
	// into the pool. After release, the corresponding pointer should not be used anymore.
	Release()
}
```

net接口分为 `NetFrame`, `NetRequest`和`NetResponse`。

NetFrame作为入口，管理全局