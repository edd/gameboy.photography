var events = require('events');
var states = require('./states');

function Events(){
  this._state = states.HOME;


  this.getState = function(){
    return this._STATE;
  };

  this.setState = function(newState){
    this._state = newState;
    this.emit('state', newState);

    return newState;
  };

  return this;
};

Events.prototype = new events.EventEmitter;

module.exports = new Events();