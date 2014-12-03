/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
//var Editor = require('../states/editor.jsx');
var Home = require('../states/home.jsx');

// var Route = require('react-router').Route;
// var Routes = require('react-router').Routes;

// var Animation = require('../states/editor/animate.jsx');
// var Download = require('../states/editor/download.jsx');
// var AnimationDownload = require('../states/editor/animationdownload.jsx');


require('../../styles/reset.css');
require('../../styles/main.css');

React.renderComponent((
    <Home />

), document.body); // jshint ignore:line
