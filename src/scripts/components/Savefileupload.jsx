/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Savefileupload.css');

var Savefileupload = React.createClass({


  /*jshint ignore:start */
  render: function () {
    // onDragOver={this.onDragOver} onDragLeave={this.onDragEnd} onDragEnd={this.onDragEnd} onDrop={this.onDrop}
      return (
        <div className="uploadTarget">
          <p className="upload hidden">
            <label>Drag &amp; drop not supported, but you can still upload via this input field:<br />
              <input type="file" />
            </label>
          </p>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Savefileupload;
