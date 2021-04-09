const { promises: fs } = require('fs')
const { join } = require('path')

const joinPath = p => join(__dirname, p)

const filename = joinPath('./dir')

async function readFile(filename) {
  try {
    const stat = await fs.stat(filename)
    if (stat.isDirectory()) {
      const files = await fs.readdir(filename)
      files.forEach((file, index) => {
        const f = join(filename, file)
        console.log('f', f)
        console.log('index', index)
        readFile(f)
      })
    } else if (stat.isFile) {
      try {
        const content = await fs.readFile(filename, 'utf-8')
        console.log('content', content)
      } catch (error) {
        console.log('error', error)
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('文件或文件夹不存在')
    }
  }
}

readFile(filename)