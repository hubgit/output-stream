const { mkdtemp, readFile } = require('node:fs/promises')
const path = require('node:path')
const os = require('node:os')

const outputStream = require('../')

test('output ndjson', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'foo-'))
  const file = path.join(dir, 'output.ndjson')

  await new Promise((resolve) => {
    const stream = outputStream(file)
    stream.write({ a: 'foo', b: 'foo' })
    stream.write({ a: 'bar', b: 'foo' })
    stream.write({ a: 'baz', b: 'foo' })
    stream.end()
    stream.emit('finish')
    stream.on('finish', resolve)
  })

  const data = await readFile(file, 'utf-8')
  const result = data
    .split('\n')
    .filter(Boolean)
    .map((json) => JSON.parse(json))

  expect(result).toEqual([
    { a: 'foo', b: 'foo' },
    { a: 'bar', b: 'foo' },
    { a: 'baz', b: 'foo' },
  ])
})

test('output csv', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'foo-'))
  const file = path.join(dir, 'output.csv')

  await new Promise((resolve) => {
    const stream = outputStream(file, { headers: ['a', 'b'] })
    stream.write({ a: 'foo', b: 'foo' })
    stream.write({ a: 'bar', b: 'foo' })
    stream.write({ a: 'baz', b: 'foo' })
    stream.end()
    stream.emit('finish')
    stream.on('finish', resolve)
  })

  const result = await readFile(file, 'utf-8')
  expect(result).toEqual(`a,b\nfoo,foo\nbar,foo\nbaz,foo\n`)
})

test('output tsv', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'foo-'))
  const file = path.join(dir, 'output.tsv')

  await new Promise((resolve) => {
    const stream = outputStream(file, { headers: ['a', 'b'] })
    stream.write({ a: 'foo', b: 'foo' })
    stream.write({ a: 'bar', b: 'foo' })
    stream.write({ a: 'baz', b: 'foo' })
    stream.end()
    stream.emit('finish')
    stream.on('finish', resolve)
  })

  const result = await readFile(file, 'utf-8')
  expect(result).toEqual(`a\tb\nfoo\tfoo\nbar\tfoo\nbaz\tfoo\n`)
})
