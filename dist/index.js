
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./confetti-react.cjs.production.min.js')
} else {
  module.exports = require('./confetti-react.cjs.development.js')
}
