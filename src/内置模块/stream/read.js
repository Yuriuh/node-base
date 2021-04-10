const { createReadStream } = require('fs')
const { join } = require('path')
const joinCurrentPath = f => join(__dirname, f)
const sleep = d => new Promise(r => setTimeout(r, d))

const filename = joinCurrentPath('./a.txt')

async function main() {
  const rs = await createReadStream(filename, {
    encoding: 'utf-8',
    highWaterMark: 1,
    autoClose: true,
  })
  rs.on('open', () => console.log('文件被打开了'))
  rs.on('error', error => console.log('error', error))
  rs.on('close', () => console.log('文件被关闭'))
  rs.on('data', async chunk => {
    console.log('chunk', chunk);
    rs.pause()
    await sleep(1000)
    rs.resume()
  })
  rs.on('pause', () => {
    console.log('暂停读取文件');
  })
  rs.on('resume', () => {
    console.log('恢复读取文件')
  })
  rs.on('end', () => {
    console.log('全部数据读取完毕');
  })
}

main()