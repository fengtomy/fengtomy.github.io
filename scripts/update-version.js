import fs from 'node:fs'

const [vStr] = process.argv.slice(2)
const v = vStr.split('=')[1]

fs.readFile('package.json', 'utf-8', function(err, res) {
    const obj = JSON.parse(res)
    let [major, minor, patch] = obj.version.split('.').map(Number)
    if (v === 'major') {
        major += 1
    } else if (v === 'minor') {
        minor += 1
    } else if (v === 'patch') {
        patch += 1
    }

    obj.version = [major, minor, patch].join('.')

    // Contemporarily rewrite the whole file.
    fs.writeFile('package.json', JSON.stringify(obj, null, 2), (err) => {
        if (err) {
            console.error('Failed to update package version.', err)
        }
    })
})