const { createWriteStream } = require('fs')
const { join } = require('path')
const joinCurrentPath = f => join(__dirname, f)
const sleep = d => new Promise(r => setTimeout(r, d))

// 一直写，直到到达上限，或无法再直接写入
async function main() {
  const filename = joinCurrentPath('./temp/a.txt')
  const ws = createWriteStream(filename, {
    encoding: 'utf-8',
    // highWaterMark: 32
  })

  let index = 0
  function writeSmartly(ws) {
    let notFull = true
    while(index < 1024 * 1024 * 10 && notFull) {
      notFull = ws.write('a')
      index += 1
    }
  }

  writeSmartly(ws)
  ws.on('drain', () => {
    writeSmartly(ws)
  })
}

main()