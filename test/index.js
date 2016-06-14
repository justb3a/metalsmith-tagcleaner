/* global describe, it */
'use strict';

const assert = require('assert');
const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const tagcleaner = require('..');
const expected = [
  '<img src="path/to/image.png" alt="img alt">',
  '<a href="http://www.metalsmith.io/"><img src="path/to/image" alt="alt text" title="hover text"></a>',
  '<a href="path/to/image"><img src="http://www.metalsmith.io/" alt="alt text"></a>'
];

describe('metalsmith-tagcleaner', () => {

  it('unnecessary paragraph wrappers around image tag', (done) => {
    metalsmith('test/fixture')
    .use(markdown())
    .build((err, files) => {
      if (err) {
        return done(err);
      }

      const content = files['index.html'].contents.toString().trim();

      content.split('\n').forEach((markup, key) => {
        assert.notEqual(markup, expected[key]);
        assert.equal(markup, `<p>${expected[key]}</p>`);
      });

      return done();
    });
  });

  it('should remove paragraph tags from HTML', (done) => {
    metalsmith('test/fixture')
    .use(markdown())
    .use(tagcleaner())
    .build((err, files) => {
      if (err) {
        return done(err);
      }

      const content = files['index.html'].contents.toString().trim();

      content.split('\n').forEach((markup, key) => {
        assert.equal(markup, expected[key]);
      });

      return done();
    });
  });
});
