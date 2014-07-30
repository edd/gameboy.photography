/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Editor = require('../states/editor.jsx');
var Container = require('../states/container.jsx');
var Route = require('react-router').Route;
var Routes = require('react-router').Routes;

  var Animation = require('../states/editor/animate.jsx');
  var Home = require('../states/home.jsx');
  var Filter = require('../states/editor/filter.jsx');
  var Download = require('../states/editor/download.jsx');
  var AnimationDownload = require('../states/editor/animationdownload.jsx');


require('../../styles/reset.css');
require('../../styles/main.css');

React.renderComponent((
    <Routes location="hash">
      <Route handler={Container}>
        <Route path="/" name="home" handler={Home} />
        <Route name="editor" handler={Editor}>
          <Route name="filter" handler={Filter} />
          <Route name="download" handler={Download} />
          <Route name="animation" handler={Animation}>
            <Route name="animationDownload" handler={AnimationDownload} />
          </Route>
        </Route>
      </Route>
    </Routes>

), document.body); // jshint ignore:line
