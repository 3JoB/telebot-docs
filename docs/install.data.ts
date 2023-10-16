export default {
    async load() {
        return (await fetch('https://api.github.com/repos/3JoB/telebot/releases/latest')).json()
    }
}