---
title: 使用Webhook
layout: doc
---

# 使用Webhook

如果你還不知道Webhook，那麼請看[這裡](https://core.telegram.org/bots/api#getting-updates)。

它是一種獲取更新的方法，Crare默認採用一個長輪詢來使用getUpdates方法，相關接口見[這裡](../interface/poller.md)。

來看最新的可用示例:
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

它運行良好，通常情況下，它應該隱藏在nginx或者CDN的後面，所以一般情況下都不需要在機器人中配置證書。

## 安全

如果你擔心有未經授權的用戶訪問了Webhook並進行破壞，那麼僅需要做如下即可僅讓來自Telegram的流量進入
```go
b := crare.Settings{
		Poller: &crare.Webhook{
			Verify: &crare.WebhookVerify{
				DB: "asn.mmdb",
			},
		},
	}
```

你需要在`Verify` 的`DB` 項中填入maxmind asn 數據庫文件的路徑，如果你還沒有，那麼需要去[他們的網站](https://www.maxmind.com/)登錄/註冊並下載一個ASN數據庫。注意，Verify僅接受.mmdb文件。

這是第二道防線，Crare會在一開始就校驗訪問者是否攜帶了正確的密鑰。

## 其他
每次收到Webhook更新時，機器人都可以直接回复，並在回復中給出方法作為JSON有效負載。

但是由於設計原因，我暫時不能做這個，它仍然是由`Raw`方法來傳出的JSON，相關的文章在[這裡](https://core.telegram.org/bots/faq#how-can-i-make-requests-in-response-to-updates)。