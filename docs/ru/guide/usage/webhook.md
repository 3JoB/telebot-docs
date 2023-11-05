---
title: Webhook
layout: doc
---

# Webhook

If you don't know webhook, then please see [here](https://core.telegram.org/bots/api#getting-updates).

It is a method for getting updates. Crare's default behavior uses a long -wheeled inquiry to use the getupdates method. See the relevant interface [here](../interface/poller.md)。

Look at the latest usable example:
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

It runs well. Usually, it should be hidden behind Nginx or CDN, so it is generally not necessary to configure a certificate in the robot under the general situation.

## Security

If you are worried that unauthorized users can access Webhook and destroy it, then you can only allow the flow of Telegram to enter:
```go
b := crare.Settings{
		Poller: &crare.Webhook{
			Verify: &crare.WebhookVerify{
				DB: "asn.mmdb",
			},
		},
	}
```

You need to fill in the path of the Maxmind Asn database file in the `Verify`'s` db` item. If you do not have it, you need to go to [their website](https://www.maxmind.com/) login/register and download an ASN database. Note that Verify only accepts .mmdb files.

This is the second line of defense, and Crare will check whether the visitors carry the correct key at the beginning.

## Other
Every time you receive the Webhook update, the robot can reply directly and give the method as a effective load in JSON in the reply.

However, due to design reasons, I can't do this for the time being. It is still JSON, which is out of the `Raw` method. The related articles are [here](https://core.telegram.org/bots/faq#how-can-i-make-requests-in-response-to-updates).