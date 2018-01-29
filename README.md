# Example usage

```js
const collection = require('rest-collection-stream')
const output = require('output-stream')('repositories.ndjson')

collection('https://api.github.com/search/repositories', {
  qs: {
    sort: 'stars',
    order: 'desc',
    q: 'language:javascript'
  },
  headers: {
    'User-Agent': 'rest-collection'
  }
}).pipe(output)
```
