const { promises: fs } = require('fs')
const { join, basename, extname } = require('path')

const joinCurrentPath = p => join(__dirname, p)

class File {
  constructor(filename, name, ext, isFile, size, createdTime, updatedTime) {
    this.filename = filename
    this.name = name
    this.ext = ext
    this.isFile = isFile
    this.size = size
    this.createdTime = createdTime
    this.updatedTime = updatedTime
  }
  static async getFile(filename) {
    const stat = await fs.stat(filename)
    const name = basename(filename)
    const ext = extname(filename)
    const isFile = stat.isFile()
    const size = stat.size
    const createdTime = new Date(stat.birthtime)
    const updatedTime = new Date(stat.mtime)
    return new File(filename, name, ext, isFile, size, createdTime, updatedTime)
  }
  async getContent(isBuffer = false) {
    if (this.isFile) {
      const encoding = isBuffer ? '' : 'utf-8'
      return await fs.readFile(this.filename, encoding)
    }
    return null
  }
  async getChildren() {
    // 文件不可能有子文件
    if (this.isFile) {
      return []
    } else {
      const children = await fs.readdir(this.filename)
      // console.log('children', children);
      const files = children.map(filename => {
        const f = join(this.filename, filename)
        return File.getFile(f)
      })
      return Promise.all(files)
    }
  }
}

async function test() {
  const filename = joinCurrentPath('./dir')
  const file = await File.getFile(filename)
  // const content = await file.getContent()
  const children = await file.getChildren()
  console.log('file', file);
  // console.log('content', content)
  // console.log('children', children);
  const innerDir = children[3]
  const innerChildren = await innerDir.getChildren()
  console.log('innerChildren', innerChildren);
}

test()
