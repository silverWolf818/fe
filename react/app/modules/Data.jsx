//
var React = require('react')
var ReactDOM = require('react-dom')

const UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: ''
    };
  },

  componentDidMount: function() {
  $.get('https://api.github.com/users/octocat/gists', function(result) {
    var lastGist = result[0];
    if (this.isMounted()) {
      this.setState({
        username: lastGist
      });
    }
  }.bind(this));
},

render: function() {
  return (
    <div>
      {this.state.username}'s last gist is
    </div>
  );
}
});
module.exports = UserGist;
