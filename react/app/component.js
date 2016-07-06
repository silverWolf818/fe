var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var hashHistory = ReactRouter.hashHistory
var Link =  ReactRouter.Link;
var About = require('./modules/About.js');
var Inbox = require('./modules/Inbox.js');
var Data = require('./modules/Data.js');
const App = React.createClass({displayName: "App",
  render() {
    return (
        React.createElement("div", null, 
            React.createElement("div", {className: "header"}, "header"), 
            React.createElement("div", {className: "container"}, 
                React.createElement(Link, {to: "/about"}, "About"), 
                React.createElement(Link, {to: "/inbox"}, "Inbox"), 
                React.createElement(Link, {to: "/data"}, "data"), 
                this.props.children
            ), 
            React.createElement("div", {className: "footer"}, "footer")
        )
    )
  }
});
ReactDOM.render((
  React.createElement(Router, {history: hashHistory}, 
    React.createElement(Route, {path: "/", component: App}, 
        React.createElement(Route, {path: "about", component: About}), 
        React.createElement(Route, {path: "inbox", component: Inbox}), 
        React.createElement(Route, {path: "data", component: Data})
    )
  )
), document.getElementById('app'));