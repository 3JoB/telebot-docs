export default {
    async load() {
        return (await fetch('https://api.github.com/repos/go-crare/crare/releases/latest')).json()
    }
}