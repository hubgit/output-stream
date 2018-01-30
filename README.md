# Example usage

```js
const output = require('output-stream')('repositories.ndjson')

require('rest-collection-stream')('https://api.github.com/search/repositories', {
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
