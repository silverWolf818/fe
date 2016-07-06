//
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
const App = React.createClass({
  render() {
    return (
        <div>
            <div className="header">header</div>
            <div className="container">
                <Link to="/about">About</Link>
                <Link to="/inbox">Inbox</Link>
                <Link to="/data">data</Link>
                {this.props.children}
            </div>
            <div className="footer">footer</div>
        </div>
    )
  }
});
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="inbox" component={Inbox} />
        <Route path="data" component={Data} />
    </Route>
  </Router>
), document.getElementById('app'));
