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
)

let isFirst = true
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

socket.on('data', chunk => {
  const response = chunk.toString('utf-8')
  // if (!receive) {

  // }
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
