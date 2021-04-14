const { promises: { writeFile } } = require('fs')

const { join } = require('path')

const joinPath = p => join(__dirname, p)

const filename = joinPath('./write.txt')

async function write() {
  try {
    const append = ' baz'
    await writeFile(filename, append, { flag: 'a' })
  } catch (error) {
    console.log('error', error)
  }
}

write()
