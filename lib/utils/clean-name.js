const cleanName = (file) => {
  return file.path
    .replace(file.base, '')
    .replace(/\..+/, '');
};
module.exports = cleanName;
