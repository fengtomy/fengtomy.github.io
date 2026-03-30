import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = p => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routesToPrerender = fs
    .readdirSync(toAbsolute('src/blog-posts/views'))
    .map((file) => {
        const filenameMap = {
            AddEventListenerWithRef: 'attach-event-listener-with-ref',
            IntegrateTypeScriptIntoReactVite: 'integrate-typescript-into-react-vite',
            JavaScriptMap: 'javascript-map',
            NewInECMA2023: 'new-in-ecma2023',
            NewInECMA2024: 'new-in-ecma2024',
            NewInECMA2025: 'new-in-ecma2025',
            Refresh404InSpa: 'refresh-404-in-spa',
            UnderstandCORS: 'understand-cors',
            VueCleanCode: 'vue-clean-code',
            WebsocketIntro: 'websocket-intro',
        }
        const name = filenameMap[file.replace(/.tsx$/, '')]
        return `/blog-post/${name}`
    })
    .filter(Boolean);

(async () => {
    for (const url of routesToPrerender) {
        console.log('prerender url', url)
        let { html } = await render(url)

        html = template
            .replace('<!--app-html-->', html)

        const filepath = `dist/static/${url.replace('/blog-post/', '')}.html`
        fs.writeFileSync(toAbsolute(filepath), html)
        console.log('pre-rendered:', filepath)
    }

    fs.rmSync(toAbsolute('dist/static/.vite'), { recursive: true })
})()