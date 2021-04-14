const net = require('net')

// const host = 'duyi.ke.qq.com'
const host = 'cn.bing.com'

const socket = net.createConnection(
  {
    host,
    port: 80,
  },
  () => {
    console.log('Connected successfully.')
  }
)

let receive = null

const parseResponse = response => {
  const index = response.indexOf('\r\n\r\n')
  const head = response.slice(0, index)
  const body = response.slice(index + 2)
  const headParts = head.split('\r\n')
  const headerArray = headParts.slice(1).map(str => {
    return str.split(':').map(s => s.trim())
  })
  const header = headerArray.reduce((a, b) => {
    a[b[0]] = b[1]
    return a
  }, {})
  return {
    header,
    body: body.trimStart(),
  }
}

function isOver() {
  const contentLength = Number(receive.header['Content-Length'])
  const currentReceivedLength = Buffer.from(receive.body, 'utf-8').byteLength
  return currentReceivedLength >= contentLength
}

socket.on('data', chunk => {
  const response = chunk.toString('utf-8')
  // 第一次接收数据
  if (!receive) {
    receive = parseResponse(response)
    if (isOver()) {
      socket.end()
    }
    return
  }
  receive.body += response
  if (isOver()) {
    socket.end()
    return
  }
})

socket.write(`GET / HTTP/1.1
Host: ${host}
Connection: keep-alive

`)

socket.on('close', () => {
  console.log('receive body', receive.body)
  console.log('socket closed')
})
