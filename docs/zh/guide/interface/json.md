---
title: Json
layout: doc
---

# Json
> 現在Json子包已不再提供除默認包裝器外的額外包裝器

Json是一个用于框架内Json处理的接口，在平时可以通过 `SetDefaultJSON()` 来设置一个全局的Json接口。

在 `Settings` 中，可以通过 `Json` 项来设置`Bot`中的接口，当它被设置时，它会覆盖全局的Json设置。

默认的Json接口是为 `Sonnet` 包装的。

```go
// The Json interface is used to customize the json handler.
// Five wrappers are provided by default. For detailed documentation,
// see: https://pkg.go.dev/gopkg.in/crare.v1/pkg/json.
//
// Some methods use the default sonnet because they are not under *Bot.
type Json interface {
	Marshal(v any) ([]byte, error)
	MarshalIndent(v any, prefix string, indent string) ([]byte, error)
	Unmarshal(buf []byte, v any) error
	NewEncoder(w io.Writer) Encoder
	NewDecoder(r io.Reader) Decoder
	Indent(dst *bytes.Buffer, src []byte, prefix string, indent string) error
}

type Encoder interface {
	Encode(v any) error
}

type Decoder interface {
	Decode(v any) error // Decode reads the next JSON-encoded value from its input and stores it in the value pointed to by v.
}
```

当对一个`*Bot`使用`Start()`后，也可以使用`Json()`方法来导出接口，以便`Context`或者`Middleware`使用。