---
layout: home

# Hero section
hero:
  name: Crare
  text: Launch Telegram Bot now.
  image:
    src: /crare.webp
    alt: Crare logo
  tagline: Focused and swift, fingers dance on keys, coding flows free.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/ 
    - theme: alt
      text: View on GitHub
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

---

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