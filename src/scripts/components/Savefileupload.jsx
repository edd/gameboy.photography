/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Savefileupload.css');

var Savefileupload = React.createClass({
  getInitialState: function(){
    return {
      uploadTargetClassname: 'uploadTarget'
    }
  },

  onDragOver: function(event){
    this.setState({
      uploadTargetClassname: 'uploadTarget hover'
    });

    return false;
  },

  onDragEnd: function(event){
    this.setState({
      uploadTargetClassname: 'uploadTarget'
    });

    return false;
  },

  onDrop: function(event){
    this.setState({
      uploadTargetClassname: 'uploadTarget uploading'
    });

    this.props.photoParser(event.dataTransfer.files);
    return false;
  },


  /*jshint ignore:start */
  render: function () {
    return (
        <div className={this.state.uploadTargetClassname} onDragOver={this.onDragOver} onDragLeave={this.onDragEnd} onDragEnd={this.onDragEnd} onDrop={this.onDrop}>
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
