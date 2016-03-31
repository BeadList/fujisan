'use strict';
const fs = require('fs');

const fileExists = (path) => {
  let exists = false;
  try {
    fs.statSync(path);
    exists = true;
  } catch (err) {
    if (err.code == 'ENOENT') {
    } else {
      throw err;
    }
  }
  return exists;
};

module.exports = fileExists;
