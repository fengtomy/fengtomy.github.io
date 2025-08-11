import fs from 'node:fs'

const [Component, filename] = process.argv.slice(2)

const postTemplateLiteral = `import PostTemplate from '../components/PostTemplate'

const ${Component} = () => <PostTemplate filename="${filename}" />

export default ${Component}
`

main()

function main() {
  try {
    fs.writeFile(`src/blog-posts/views/${Component}.jsx`, postTemplateLiteral, () => {
      console.log('Successfully create new blog!!!')
    })
  } catch (e) {
    console.error('An error occurred when creating new blog post', e.message)
  }
}
