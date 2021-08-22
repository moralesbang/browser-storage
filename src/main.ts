import './style.css'
import {LocalStorage} from './utils/browserStorage'

LocalStorage.set('data', '["bar"')
const name = LocalStorage.get('data')
console.log('$', typeof name)

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
