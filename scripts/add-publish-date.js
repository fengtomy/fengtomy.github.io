import fs from 'node:fs'
import os from 'node:os'
import path from 'path'

const filePairs = [
    ["AddEventListenerWithRef.tsx", "react-add-event-listener-with-ref.md"],
    ["IntegrateTypeScriptIntoReactVite.tsx", "integrate-typescript-into-React+Vite.md"],
    ["JavaScriptMap.tsx", "Map.md"],
    ["NewInECMA2023.tsx", "NewInECMAScript2023.md"],
    ["NewInECMA2024.tsx", "NewInECMAScript2024.md"],
    ["NewInECMA2025.tsx", "NewInECMAScript2025.md"],
    ["Refresh404InSpa.tsx", "refresh-404-in-spa.md"],
    ["UnderstandCORS.tsx", "understanding-cors-english.md"],
    ["VueCleanCode.tsx", "clean-code-in-vue.md"],
    ["WebsocketIntro.tsx", "WebSocket.md"],
]

const targetLineNumber = 3

main()

function main() {
    filePairs.forEach(([tsx, md]) => {
        const filepath = `src/blog-posts/views/${tsx}`
        const mdFilepath = `src/assets/md/${md}`
        fs.readFile(filepath, 'utf-8', (err, content) => {
            if (err) {
                console.error('Failed to read file content', err)
                return
            }
            const lines = content.split(os.EOL)
            const targetLine = lines[targetLineNumber - 1]
            if (targetLine.includes('date=')) {
                console.log(`${tsx} already has a date attribute.`)
                return
            }
            const insertPos = targetLine.indexOf('/>')
            fs.stat(mdFilepath, (err, stats) => {
                if (err) {
                    console.error('Failed to get file stat', err)
                    return
                }
                const [date] = stats.birthtime.toISOString().split('T')
                lines[targetLineNumber - 1] = targetLine.slice(0, insertPos) + `date="${date}" ` + targetLine.slice(insertPos)
                fs.writeFile(filepath, lines.join(os.EOL), (err) => {
                    if (err) {
                        console.error('Failed to override file', err)
                        return
                    }
                    console.log(`Successfully written file: ${filepath}.`)
                })
            })
        })
    })
}