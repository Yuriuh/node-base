const net = require('net')

const host = 'duyi.ke.qq.com'
// const host = 'cn.bing.com'

const socket = net.createConnection(
  {
    host,
    port: 80,
  },
  () => {
    console.log('Connected successfully.')
  }
)``

let isFirst = true

const parseResponse = response => {
  const index = response.indexOf('\r\n\r\n')
  const head = response.slice(0, index)
  const body = response.slice(index + 1)
  const headParts = head.split('\r\n')
  console.log('head', head)
  console.log('headParts', headParts)
  console.log('body', body)
}

socket.on('data', chunk => {
  const response = chunk.toString('utf-8')
  if (isFirst) {
    parseResponse(response)
    isFirst = false
  }
  socket.end()
})

socket.write(`GET / HTTP/1.1
Host: ${host}
Connection: keep-alive

`)

socket.on('close', () => {
  console.log('socket closed')
})
