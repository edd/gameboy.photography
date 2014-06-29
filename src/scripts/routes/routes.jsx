/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Editor = require('../states/editor.jsx');
var Container = require('../states/container.jsx');
var Route = require('react-nested-router').Route;

  var Animation = require('../states/editor/animate.jsx');
  var Filter = require('../states/editor/filter.jsx');
  var Download = require('../states/editor/download.jsx');


require('../../styles/reset.css');
require('../../styles/main.css');

React.renderComponent((
    <Route handler={Container}>
      <Route name="editor" handler={Editor}>
        <Route name="filter" handler={Filter} />
      </Route>
    </Route>

), document.body); // jshint ignore:line
