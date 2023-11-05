---
title: Network
layout: doc
---

# Network
The network interface provides a network operation wrapper for Crare.

`resty-ilo` and `fasthttp` wrappers are prebuilt.

```go
type NetFrame interface {
	// Set up Json handler
	SetJsonHandle(v json.Json)

	// Create a new request object
	Acquire() (NetRequest, NetResponse)

	ReleaseRequest(r NetRequest)

	ReleaseResponse(r NetResponse)

	Release(req NetRequest, resp NetResponse)
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
	Do() error

	// Release() will clear the data in the current pointer.
	// It is recommended to call it within the Release() method instead
	// of calling it externally.
	Reset()
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
}
```