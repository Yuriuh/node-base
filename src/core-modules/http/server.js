// 服务器
// 请求: IncomingMessage 对象
// 响应: ServerResponse 对象
const http = require('http')
const port = process.argv[2] || 3000

const handleRequest = req => {
  console.log('请求路径', req.url)
  console.log('请求头', req.headers)
  console.log('请求方法', req.method)
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString('utf-8')
  })

  req.on('end', chunk => {
    console.log('请求体', body)
  })
}

const handleResponse = res => {
  res.setHeader('x-access-token', 'qwer')
  res.end('Hello World')
}

const server = http.createServer((req, res) => {
  handleRequest(req)
  handleResponse(res)
})

server.listen(port, () => {
  console.log(`服务器在 ${port} 端口开启`)
})
