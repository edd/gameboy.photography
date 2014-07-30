/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Photos = require('../../libs/photoStore.js');
var Gif = require('../../libs/gif.js');
var map = require('lodash').map;
var Router = require('react-router');
var availableSize = [
  {value: '1', title: 'Normal'},
  {value: '1.5', title: '1.5x'},
  {value: '2', title: '2x'},
  {value: '3', title: '3x'},
  {value: '4', title: '4x'},
  {value: '10', title: '10x'}
];

module.exports = React.createClass({
  download: function (event){
    if (this.props.state === states.ANIMATING){
      this.gifPhotos(event);
    } else {
      this.zipPhotos(event)
    }
  },

  resizePhotos: function(event){
    event.preventDefault();

    var value = event.target.value;

    Photos.resize(value);
  },

  gifPhotos: function(event){
    event.preventDefault();

    var photos = document.querySelectorAll('.animationSteps canvas');
    var gif = new Gif();

    map(photos, function(photo){
      var frame = photo.toDataURL();
      gif.addFrame(frame);
    });


    gif.render(function(blob){
      window.open(URL.createObjectURL(blob));
    });
  },

  setFilter: function(event){
    event.preventDefault();

    var filter = this.filters[event.target.value];

    Photos.setFilter(filter);
  },

  renderOptions: function(){
    return map(availableSize, function(size){
      return <option value={size.option} label={size.title}>{size.value}</option>
    });
  },

  cancel: function(){
    //Router.transitionTo('editor');
    Router.transitionTo('animation');
  },

  render: function () {
    var options = this.renderOptions();

    return (
          <div className="downloadPanel">
            <form>
              <h1>Download animation</h1>
              <p>
                <label>Picture resolution
                  <select onChange={this.resizePhotos}>
                    {options}
                  </select>
                </label>
              </p>
              <p className="complete">
                <button className="control submit" onClick={this.gifPhotos}>Download</button>
                <button className="control cancel" onClick={this.cancel}>Cancel</button>
              </p>
            </form>
          </div>
        )
  }
});