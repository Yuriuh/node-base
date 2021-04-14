const net = require('net')

const server = net.createServer()
const port = process.argv[2] || 9999

server.listen(port, () => {
  console.log(`Server listen at ${port}`)
})

const content = `HTTP/1.1 200 OK

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>Hello World</div>
</body>
</html>`

server.on('connection', socket => {
  console.log('有客户端连接到服务器')

  socket.on('data', chunk => {
    console.log(chunk.toString('utf-8'))

    socket.write(content)

    // 主动关闭
    socket.end()
  })

  socket.on('end', () => {
    console.log('服务器关闭了')
  })
})
