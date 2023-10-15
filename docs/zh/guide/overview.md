---
title: 概述
layout: doc
---
# 概述
TelebotE 是 [Telebot](https://github.com/tucnak/telebot) 的快速更新和高效能分支，在此文件中除額外說明外，Telebot都代表TelebotE。

Telebot並不能直接遷移到TelebotE，因為TelebotE的部分API與Telebot不同，這是無奈之舉，而且隨著時間的推移，它的破壞性更新也會更多。
***
Telebot是[Telegram BotAPI](https://core.telegram.org/bots/api)的機器人框架。


該軟體包為命令路由,內聯查詢請求和鍵盤提供了同類中最好的 API 作為回調。 實際上，我更進一步，沒有製作 1:1 API包裝器，而是選擇專注於API和效能之美。

Telebot的一些優點:
- 真正簡潔的接口
- 命令路由
- 中介軟體
- 透明檔案介面
- 輕鬆的機器人回調

Telebot API的所有方法都非常容易记忆和习惯。另外，考虑远程机器人 高负载就绪解决方案。我将测试和基准测试最受欢迎的操作，并在必要时进行优化 在不牺牲 API 质量的情况下反对他们。