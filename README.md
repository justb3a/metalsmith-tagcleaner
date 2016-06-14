# metalsmith-tagcleaner

Metalsmith plugin to remove paragraph tags from around images.

## Installation

```
$ npm install metalsmith-tagcleaner --save
```

## Usage

```js
const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const tagcleaner = require('metalsmith-tagcleaner');

metalsmith(__dirname)
  .use(markdown())
  .use(tagcleaner())
  .build();
```

## Example

```markdown
![img alt](path/to/image.png)

[![alt text](http://www.metalsmith.io/)](path/to/image)
```

results in:

```html
<img src="path/to/image.png" alt="img alt">

<a href="http://www.metalsmith.io/"><img src="path/to/image" alt="alt text" /></a>
```

instead of:

```html
<p><img src="path/to/image.png" alt="img alt"></p>

<p><a href="http://www.metalsmith.io/"><img src="path/to/image" alt="alt text" /></a></p>
```

[Compare markdown implementations](http://johnmacfarlane.net/babelmark2/?text=!%5Bimg+alt%5D(path%2Fto%2Fimage.png))

## License

  MIT
