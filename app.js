var React = require('react');
var Router = require('react-router');
var SlideOut = require('slideout');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var App = React.createClass({
  componentDidMount: function() { 
    this.slideout = new SlideOut({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70
    });
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  slideToggle: function(e) {
    this.slideout.toggle();
    return;
  },
  render: function() {
    var name = this.context.router.getCurrentPath();
    return (
      <div>
        <Menu onSelectMenu={this.slideToggle}/>
        <Main onSelectMenu={this.slideToggle}/>
      </div>
    );
  }
});

var Page1 = React.createClass({
  render: function() {
    return (
      <div className="Page1">
        <h1>Page1</h1>
      </div>
    );
  }
});

var Page2 = React.createClass({
  render: function() {
    return (
      <div className="Page2">
        <h1>Page2</h1>
      </div>
    );
  }
});

var Main = React.createClass({
  onSelectMenu: function(e) {
    this.props.onSelectMenu();
  },
  render: function() {
    return (
      <div className="Main" id="panel">
        <header>
          <button onClick={this.onSelectMenu}>☰</button>
        </header>
        <RouteHandler key={name}/>
      </div>
    );
  }
});

var Menu = React.createClass({
  onSelectMenu: function(e) {
    this.props.onSelectMenu();
  },
  render: function() {
    return (
      <nav id="menu" className="Menu">
          <h1>Menu</h1>
          <ul>
            <li><Link onClick={this.onSelectMenu} to="page1">Page 1</Link></li>
            <li><Link onClick={this.onSelectMenu} to="page2">Page 2</Link></li>
          </ul>
      </nav>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Page1} />
    <Route name="page1" handler={Page1} />
    <Route name="page2" handler={Page2} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
