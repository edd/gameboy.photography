/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Photos = require('../libs/photoStore.js');
var Zip = require('../libs/zip.js');
var map = require('lodash').map;
var availableSize = [
  {value: '1', title: 'Normal'},
  {value: '1.5', title: '1.5x'},
  {value: '2', title: '2x'},
  {value: '3', title: '3x'},
  {value: '4', title: '4x'},
  {value: '10', title: '10x'}
];

module.exports = React.createClass({
  resizePhotos: function(event){
    event.preventDefault();

    var value = event.target.value;

    Photos.resize(value);
  },

  zipPhotos: function(event){
    event.preventDefault();

    var images = Photos.getSelectedOrEverything().map(function(photo){
      return photo.getDOMNode().toDataURL();

    });

    var zippedImages = new Zip(images);

    window.location = window.URL.createObjectURL(zippedImages);
    Router.transitionTo('editor');
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
    Router.transitionTo('editor');
    //Router.goBack();
  },

  render: function () {
    var options = this.renderOptions();
    var photos = Photos.getSelectedOrEverything().length;

    var photoWord = (photos > 1)? 'pictures' : 'picture';

    return (
          <div className="downloadPanel">
            <form>
              <h1>Download {photos} {photoWord}</h1>
              <p>
                <label>Picture resolution
                  <select onChange={this.resizePhotos}>
                    {options}
                  </select>
                </label>
              </p>
              <p className="complete">
                <button className="control submit" onClick={this.zipPhotos}>Download</button>
              </p>
            </form>
          </div>
        )
  }
});