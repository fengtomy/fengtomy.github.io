import fs from 'node:fs'

main()

function main() {
    const [vStr] = process.argv.slice(2)

    if (!vStr) {
        throw new Error('Please pass into "version=major(or minor, patch)"')
    }

    const v = vStr.split('=')[1]

    fs.readFile('package.json', 'utf-8', function(err, res) {
        if (err) {
            throw new Error('Failed to read package json content')
        }

        const obj = JSON.parse(res)

        const newVersion = upgradeVersion(obj.version, v)

        obj.version = newVersion

        // Temporarily rewrite the whole file.
        fs.writeFile('package.json', JSON.stringify(obj, null, 2), (err) => {
            if (err) {
                throw new Error('Failed to update package version.')
            }
            console.log('Successfully upgrade the package version')
        })
    })
}

function upgradeVersion(version, vPos) {
    let [major, minor, patch] = version.split('.').map(Number)

    if (vPos === 'major') {
        major += 1
    } else if (vPos === 'minor') {
        minor += 1
    } else if (vPos === 'patch') {
        patch += 1
    }

    return [major, minor, patch].join('.')
}
