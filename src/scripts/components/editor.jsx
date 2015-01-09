/**
 * @jsx React.DOM
 */
/*global require: false, module: false;*/

'use strict';

var React = require('react/addons');
var Photostrip = require('./Photostrip.jsx');
var PhotoViewer = require('./Photoviewer.jsx');
var Photos = require('../libs/photoStore');
var Flasherror = require('./Flasherror.jsx');
var states = require('../libs/states');
var GlobalEvents = require('../libs/events.js');
var Download = require('./download.jsx');
var text = require('../content/about.json');

// CSS
require('../../styles/main.css');
require('../../styles/Paletteselector.css');

module.exports = React.createClass({
  getInitialState: function(){
    Photos.on('selected', this.itemsAreSelected);
    Photos.on('noselection', this.noItemsAreSelected);
    Photos.on('update', this.updatedPhotos);

    return {
      photos: Photos,
      status: (Photos.length === 0) ? states.HOME : states.UPLOADED,
      flashError: false,
      selected: false
    }
  },

  firefoxFix: function(){
    var dragItems = document.querySelectorAll('[draggable=true]');

    for (var i = 0; i < dragItems.length; i++) {
      dragItems[i].addEventListener('dragstart', function (event) {
        // store the ID of the element, and collect it on the drop later on

        event.dataTransfer.setData('Text', this.id);
      });
    }
  },

  itemsAreSelected: function (){
    this.setState({selected: true});
  },

  noItemsAreSelected: function (){
    this.setState({selected: false});
  },

  updatedPhotos: function(){
    this.setState({photos: Photos})
  },


  componentWillReceiveProps: function(){
    GlobalEvents.emit('animationHeight', 20);
  },

  componentDidMount: function(){
    this.firefoxFix();
  },

  /*jshint ignore:start */
  render: function() {
    var shouldShowPhotos = true;

    document.documentElement.className = 'processing';

    if (this.state.photos.length === 0){
      return (<footer className="section fourth">
          <p>Drag a Gameboy save file on to the page to get started.</p>
          <p>For instructions on getting photos from your Gameboy camera, try <a href="http://gameboyphoto.com/">Gameboyphoto.com</a></p>
        </footer>);
    }

    return (
        <div className="editorContainer">
        <aside className="section second editor">
          <Flasherror error={this.state.flashError} clearError={this.clearError}></Flasherror>

          <Photostrip photos={this.state.photos} menuActive={shouldShowPhotos}></Photostrip>
        </aside>
        <main className="section third">
          <Download />
        </main>
        <footer className="section fourth">
          <p>Tada!</p>
          <p>Made by <a href="http://twitter.com/eddhannay">@eddhannay</a>. Design by <a href="https://twitter.com/derekboateng">Derek Boateng</a></p>
        </footer>
        </div>
      );
  }

  /*jshint ignore:end */
});
