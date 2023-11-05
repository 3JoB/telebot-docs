---
title: 使用Webhook
layout: doc
---

# 使用Webhook

如果你还不知道Webhook，那么请看[这里](https://core.telegram.org/bots/api#getting-updates)。

它是一种获取更新的方法，Crare默认采用一个长轮询来使用getUpdates方法，相关接口见[这里](../interface/poller.md)。

来看最新的可用示例:
```go
package main

import (
	"gopkg.in/crare.v1"
	crare_net "gopkg.in/crare.v1/pkg/net"
)

func main() {
	b := crare.Settings{
		Token: "",
		Client: crare_net.NewFastHTTPClient(),
		Poller: &crare.Webhook{
			Host: "example.com",
			Listen: ":8846",
			TLS: &crare.WebhookTLS{
				NoLocal: true,
			},
			SecretToken: "secretToken",
			Verify: &crare.WebhookVerify{
				DB: "asn.mmdb",
			},
		},
	}
	bot, err := crare.NewBot(b)
	if err != nil {
		panic(err)
	}
	bot.Handle(crare.OnText, func(ctx *crare.Context) error {
		ctx.Send("ok")
		return nil
	})
	bot.Start()
}
```

它运行良好，通常情况下，它应该隐藏在nginx或者CDN的后面，所以一般情况下都不需要在机器人中配置证书。

## Webhook安全

如果你担心有未经授权的用户访问了Webhook并进行破坏，那么仅需要做如下即可仅让来自Telegram的流量进入
```go
b := crare.Settings{
		Poller: &crare.Webhook{
			Verify: &crare.WebhookVerify{
				DB: "asn.mmdb",
			},
		},
	}
```

你需要在 `Verify` 的 `DB` 项中填入 maxmind asn 数据库文件的路径，如果你还没有，那么需要去[他们的网站](https://www.maxmind.com/)登录/注册并下载一个ASN数据库。注意，Verify仅接受.mmdb文件。

## 其他
每次收到Webhook更新时，机器人都可以直接回复，并在回复中给出方法作为JSON有效负载。

但是由于设计原因，我暂时不能做这个，它仍然是由`Raw`方法来传出的JSON，相关的文章在[这里](https://core.telegram.org/bots/faq#how-can-i-make-requests-in-response-to-updates)。