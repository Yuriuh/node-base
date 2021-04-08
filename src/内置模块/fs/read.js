const fs = require('fs')
const { join } = require('path')

const joinPath = p => join(__dirname, p)

const filePath = joinPath('./read.txt')

fs.readFile(filePath, 'utf-8', (error, data) => {
  if (error) {
    console.log('error', error)
  }
  console.log('data', data)
})

async function readFile(filename) {
  const content = await fs.promises.readFile(filename, 'utf-8')
  console.log('content', content)
}

readFile(filePath)