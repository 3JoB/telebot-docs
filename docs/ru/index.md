---
layout: home

# Hero section
hero:
  name: Crare
  text: Запустите Telegram-бот прямо сейчас
  image:
    src: /crare.webp
    alt: Crare logo
  tagline: Не о чем волноваться, кончики пальцев летают, а код не вызывает затруднений.
  actions:
    - theme: brand
      text: Попробуй это сейчас
      link: /ru/guide/
    - theme: alt
      text: Посмотреть на GitHub
      link: https://github.com/go-crare/crare

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