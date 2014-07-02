/**
 * @jsx React.DOM
 *
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Photos = require('../libs/photoStore');
var dragProxy = require('../libs/dragproxy');
require('../../styles/Photo.css');

var Photo = React.createClass({
  context: false,
  hasMounted: false,

  propTypes: {
    selectable: React.PropTypes.bool.isRequired,      // True if clicking should select it
    photo: React.PropTypes.string.isRequired,         // UID of photo for this canvas
    onClick: React.PropTypes.func
  },

  getInitialState: function(){
    var photo = Photos.get(this.props.photo);

    photo.onFilterChange = this.doFilter;
    photo.onUndo = this.doUndo;
    photo.onResize = this.doResize;
    photo.onDelete = this.delete;

    return {
      photo: photo,
      width: 128,
      height: 112,
      scale: 1
    };
  },

  getWidth: function(){
    return this.state.width * this.state.scale;
  },

  getHeight: function(){
    return this.state.height * this.state.scale;
  },

  getImageData: function(){
    return this.getDOMNode().toDataURL();
  },

  componentDidMount: function(){
    this.getContext();
    this.drawPhoto();

    this.state.photo.setDOMNode(this.getDOMNode());
  },

  doResize: function(newScale){
    this.setState({
      scale: newScale
    });

    this.drawPhoto();
  },

  doFilter: function(filter){
     this.getContext();

     filter(this.context.getImageData(0, 0, this.getWidth(), this.getHeight()), function(imageData){
       this.context.putImageData(imageData, 0, 0);
       this.state.photo.setImageData(this.getImageData());
     }.bind(this));
  },

  doUndo: function(){
     this.drawPhoto();
  },

  getContext: function(){
    this.context = this.getDOMNode().getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
  },

  drawPhoto: function(){
    var imageData = this.state.photo.getImageData();
    if (imageData !== false){
      var image = new Image();
      image.src = imageData;

      console.log(imageData);

      console.log(typeof imageData);

      image.onload = function () {
        this.getContext();
        this.context.drawImage(image, 0, 0, this.getWidth(), this.getHeight());
      }.bind(this);
    } else if (typeof this.state.photo.pixels !== 'undefined' && this.state.photo.pixels.length > 0) {

      this.state.photo.pixels.map(this.drawPixel);
      this.state.photo.setImageData(this.getImageData());
    }
  },

  drawPixel: function(pixel){
      this.context.fillStyle = "rgba("+pixel.colour[0]+","+pixel.colour[1]+","+pixel.colour[2]+","+pixel.colour[3]+")";
      this.context.fillRect( (pixel.x * this.state.scale), (pixel.y * this.state.scale), this.state.scale, this.state.scale );
  },

  selectPhoto: function(event){
    event.preventDefault();

    if (this.props.selectable === true) {
      var selected = !this.state.selected;
      this.setState({
        selected: selected
      });

      this.state.photo.isSelected(selected);
    }
  },

  onDragStart: function(event){
    var id = event.target.getAttribute('data-photo-id');
    var photo = Photos.get(id);

    dragProxy.onDragStart(photo);
  },

  /*jshint ignore:start */
  render: function () {
    return (
        <canvas
            onDragStart={this.onDragStart}
            draggable="true"
            onClick={this.selectPhoto}
            data-photo-id={this.state.photo.id}
            width={this.getWidth()}
            height={this.getHeight()}>
        </canvas>
      )
  }
  /*jshint ignore:end */
});

module.exports = Photo;
