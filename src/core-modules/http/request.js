// 客户端
// 请求: ClientRequest 对象
// 响应: IncomingMessage 对象

const http = require('http')

const url = 'http://www.baidu.com/'

const request = http.request(url, { method: 'GET' }, res => {
  console.log('res statusCode', res.statusCode)
  console.log('res headers', res.headers)

  let result = ''
  res.on('data', chunk => {
    result += chunk.toString('utf-8')
  })

  res.on('end', () => {
    console.log(result)
  })
})

// 表示消息体结束
request.end()
