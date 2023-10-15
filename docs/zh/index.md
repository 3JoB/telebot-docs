---
layout: home

# Hero section
hero:
  name: TelebotE 2
  text: 現在就啟動Telegram Bot
  image:
    src: /telebot.webp
    alt: Telebot E logo
  tagline: 心無旁鷚,指尖如飛,代碼自在.
  actions:
    - theme: brand
      text: 立即體驗
      link: /zh/guide/
    - theme: alt
      text: 在GitHub中查看
      link: https://github.com/3JoB/telebot

# Features section
features:
  - icon: ⚡️
    title: Control
    details: empty
  - icon: 🎉
    title: Fastest update
    details: empty
  - icon: 🔥
    title: No more advantages
    details: empty
  - icon: 🎀
    title: I really don’t know how to write it…
    details: empty

----
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>