'use strict';

const basename = require('path').basename;
const debug = require('debug')('metalsmith-tagcleaner');
const dirname = require('path').dirname;
const extname = require('path').extname;

/**
 * Check if a `file` is html
 *
 * @param {String} file
 * @return {Boolean}
 */
const isHtml = (file) => (/\.html|\.htm/).test(extname(file));

/**
 * Metalsmith plugin to remove paragraph tags from around images
 *
 * @param {Object} options (optional)
 * @property {Array} keys
 * @return {Function}
 */
const plugin = () => (files, metalsmith, done) => {
  setImmediate(done);
  Object.keys(files).forEach((file) => {
    debug('checking file: %s', file);
    if (!isHtml(file)) {
      return;
    }

    const data = files[file];
    const dir = dirname(file);
    let html = `${basename(file, extname(file))}.html`;

    if (dir !== '.') {
      html = `${dir}/${html}`;
    }

    debug('Removing paragraph tags from around images in file: %s', file);

    const text = data.contents.toString();
    const reg = /<p>((?:.(?!p>))*?)(<a[^>]*>)?\s*(<img[^>]+>)(<\/a>)?(.*?)<\/p>/gi;
    const rep = (match) => match.replace(/<(\/)?p>/gi, '');
    const encoded = text.replace(reg, rep);

    data.contents = new Buffer(encoded);
    delete files[file];
    files[html] = data;
  });
};

/**
 * Expose `plugin`.
 */
module.exports = plugin;
