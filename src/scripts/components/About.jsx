/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var SaveFileUpload = require('../components/SaveFileUpload.jsx');
var Photos = require('../libs/photoStore');
var map = require('lodash').map;
var Editor = require('./editor.jsx');
var states = require('../libs/states.js');

var text = require('../content/about.json');

require('../../styles/About.css');

var About = React.createClass({
  render: function () {
        return (
            <div className="about">
              <header className="section first">
                <div className="imageContainer">
                  <img src="images/gameboy.png" />
                </div>
                <SaveFileUpload></SaveFileUpload>
              </header>

              <Editor changeState={this.changeState} isAnythingSelected={false} state={states.HOME} />
          </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = About;
