const net = require('net')
const { promises: fs } = require('fs')
const { join } = require('path')

const server = net.createServer()
const port = process.argv[2] || 9999

server.listen(port, () => {
  console.log(`Server listen at ${port}`)
})

const headerString = `HTTP/1.1 200 OK
Content-Type: image/jpeg

`

server.on('connection', socket => {
  console.log('有客户端连接到服务器')

  socket.on('data', async chunk => {
    console.log(chunk.toString('utf-8'))
    const filename = join(__dirname, './dog.jpg')
    const headerBuffer = Buffer.from(headerString, 'utf-8')
    const bodyBuffer = await fs.readFile(filename)
    const result = Buffer.concat([headerBuffer, bodyBuffer])
    socket.write(result)
    // 主动关闭
    socket.end()
  })

  socket.on('end', () => {
    console.log('服务器关闭了')
  })
})
