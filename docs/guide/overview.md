---
title: Overview
layout: doc
---
# Overview
TelebotE is a fast-updating and high-performance fork of [Telebot](https://github.com/tucnak/telebot). In this document, Telebot stands for TelebotE unless otherwise stated.

Telebot cannot be directly migrated to TelebotE because some of TelebotE's APIs are different from Telebot. This is a helpless move, and as time goes by, it will have more destructive updates.
***

Telebot is a bot framework for [Telegram Bot API](https://core.telegram.org/bots/api). This package provides the best of its kind API for command routing, inline query requests and keyboards, as well as callbacks. Actually, I went a couple steps further, so instead of making a 1:1 API wrapper I chose to focus on the beauty of API and performance. Some strong sides of Telebot are:

- Real concise API
- Command routing
- Middleware
- Transparent File API
- Effortless bot callbacks

All the methods of Telebot API are extremely easy to memorize and get used to. Also, consider Telebot a highload-ready solution. I'll test and benchmark the most popular actions and if necessary, optimize against them without sacrificing API quality.