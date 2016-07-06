var React = require('react')
var ReactDOM = require('react-dom')

const Inbox = React.createClass({displayName: "Inbox",
  render() {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Inbox"), 
        "Welcome to your Inbox"
      )
    )
  }
})

module.exports = Inbox;