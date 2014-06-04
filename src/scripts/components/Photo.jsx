/**
 * @jsx React.DOM
 *
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
require('../../styles/Photo.css');

var Photo = React.createClass({
  context: false,
  hasMounted: false,
  propTypes: {
    optionalNumber: React.PropTypes.number
  },

  getDefaultProps: function(){
    return {
      scale: 1
    };
  },

  getInitialState: function(){
    return {
        width: 128,
        height: 112
    };
  },

  getWidth: function(){
    return this.state.width * this.props.scale;
  },

  getHeight: function(){
    return this.state.height * this.props.scale;
  },

  componentDidMount: function(){
    this.getContext();
    this.drawPhoto();
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (nextProps.photo.id !== this.props.photo.id){
        this.getContext();

        if (this.context !== false){
            this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            this.drawPhoto();

            return false;
        }
    }

    return false;
  },

  getContext: function(){
      this.context = this.getDOMNode().getContext('2d');
      this.context.imageSmoothingEnabled = false;
      this.context.webkitImageSmoothingEnabled = false;
  },

  drawPhoto: function(){
      this.props.photo.pixels.map(this.drawPixel);
  },

  drawPixel: function(pixel){
      this.context.fillStyle = "rgba("+pixel.colour[0]+","+pixel.colour[1]+","+pixel.colour[2]+","+pixel.colour[3]+")";
      this.context.fillRect( (pixel.x * this.props.scale), (pixel.y * this.props.scale), this.props.scale, this.props.scale );
  },

    /*jshint ignore:start */
  render: function () {
    return (
        <canvas rel={this.props.photo.id} width={this.getWidth()} height={this.getWidth()}>
        </canvas>
      )
  }
  /*jshint ignore:end */
});

module.exports = Photo;