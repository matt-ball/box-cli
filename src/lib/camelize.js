function camelize (str) {
  return str.replace(/-./g, x=>x[1].toUpperCase())
}

module.exports = camelize
