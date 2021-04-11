const { promises: fs, createReadStream, createWriteStream } = require('fs')
const { join } = require('path')
const joinCurrentPath = f => join(__dirname, f)

const from = joinCurrentPath('./temp/a.txt')
const to = joinCurrentPath('./temp/to.txt')

async function copyByfs() {
  const content = await fs.readFile(from)
  await fs.writeFile(to, content)
}

async function copyByStream() {
  const rs = createReadStream(from)
  const ws = createWriteStream(to)
  rs.on('data', chunk => {
    // 读到一部分数据
    const notFull = ws.write(chunk)
    if (!notFull) {
      // 表示下一次写入会造成背压
      rs.pause()
    }
  })
  ws.on('drain', () => {
    // 可以继续写了
    rs.resume()
  })
  rs.on('close', () => {
    // 文件写完了
    ws.end()
    console.timeEnd('copyByStream');
  })
}

async function copyByPipe() {
  const rs = createReadStream(from)
  const ws = createWriteStream(to)
  rs.pipe(ws)
  rs.on('close', () => {
    console.timeEnd('copyByPipe');
  })
}

async function main() {
  console.time('copyByfs');
  await copyByfs()
  console.timeEnd('copyByfs');

  console.time('copyByStream');
  copyByStream()

  console.time('copyByPipe');
  copyByPipe()
}

main()