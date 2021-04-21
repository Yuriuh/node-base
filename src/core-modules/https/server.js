const https = require('https')
const port = process.argv[2] || 443
const { promises: fs, readFileSync } = require('fs')
const { URL } = require('url')
const { join } = require('path')

const joinPublicPath = path => join('public', path)

const key = readFileSync(join(__dirname, './server-key.pem'))
const cert = readFileSync(join(__dirname, './server-cert.crt'))

const readFile = async filename => {
  try {
    const data = await fs.readFile(filename)
    return { ok: true, data, error: null }
  } catch (error) {
    return { ok: false, data: null, error }
  }
}

const serverListener = async (req, res) => {
  const baseURL = 'https://' + req.headers.host
  const parsedUrl = new URL(req.url, baseURL)
  const { pathname } = parsedUrl
  const filename = joinPublicPath(pathname.slice(1))
  const { ok, data, error } = await readFile(filename)
  if (ok) {
    res.end(data)
  } else {
    res.end('Not Found')
  }
}

const server = https.createServer(
  {
    key,
    cert,
  },
  serverListener
)

server.listen(port, () => {
  console.log(`服务器在 ${port} 端口开启`)
})
