import React from 'react'
import ReactDOM from 'react-dom'

require("bootstrap/dist/css/bootstrap.css")
var App = require('./components/App').default

ReactDOM.render(<App />, document.getElementById('app'))