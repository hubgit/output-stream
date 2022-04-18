const fs = require('node:fs')
const path = require('node:path')
const csv = require('csv-write-stream')
const ndjson = require('ndjson')

module.exports = function (filename, options) {
  const serializer = serializerFromFilename(filename, options)

  const output = fs.createWriteStream(filename)

  output.on('finish', function () {
    console.log(`Finished writing to ${filename}`)
  })

  serializer.pipe(output)

  return serializer
}

function serializerFromFilename(filename, options) {
  switch (path.extname(filename)) {
    case '.ndjson':
      return ndjson.stringify()

    case '.csv':
      return csv(options)

    case '.tsv':
      return csv({
        ...options,
        separator: '\t',
      })

    default:
      throw new Error('Unsupported file type')
  }
}
