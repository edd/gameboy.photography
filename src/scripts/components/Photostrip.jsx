/**
 * @jsx React.DOM
 */

'use strict';

require('../../styles/Photostrip.css');

var React = require('react/addons');
var Photo = require('./Photo.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var GlobalEvents = require('../libs/events.js');

var Photostrip = React.createClass({

  propTypes: {
    photos: React.PropTypes.object.isRequired,          // Array or PhotoStore
    menuActive: React.PropTypes.bool,
  },

  getInitialState: function (){
    GlobalEvents.on('animationHeight', this.changeStyle);

    return {
      style: {
        marginTop: '20px'
      }
    };
  },

  changeStyle: function(newHeight){
    var style = this.state.style;

    if (style.marginTop == newHeight+'px'){
      return false;
    } else {
      style.marginTop = newHeight+'px';

      this.setState({
        style: style
      });
    }
  },

  componentDidMount: function(){
    this.props.photos.save();
  },

  render: function () {
    var photoNodes = this.props.photos.get().map(function (photo) {
      return <li key={photo.id} className={(photo.selected)?'photo selected': 'photo'}><Photo selectable={true} filter={this.props.filter} photo={photo.id}></Photo></li>;
    }.bind(this));

    var className = (this.props.menuActive)? 'photoList' : 'photoList hidden';

    return (
        <ol className={className} onClick={this.selectPhoto} style={this.state.style}>
          {photoNodes}
        </ol>
    );
  }

});

module.exports = Photostrip;
