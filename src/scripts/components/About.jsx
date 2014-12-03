/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var SaveFileUpload = require('../components/SaveFileUpload.jsx');
var Photos = require('../libs/photoStore');
var map = require('lodash').map;
var Router = require('react-router');
var Link = Router.Link;

var exampleSave = require('../content/defaultPhotoset.json');
var text = require('../content/about.json');

require('../../styles/About.css');

var About = React.createClass({
  getInitialState: function(){
    return {
      activeTab: 'cartridge'
    };
  },

  renderLink: function () {
    if (Photos.length > 0){
      return (<Link to="editor">Go to editor</Link>)
    }
  },

  prepopulate: function(){
    Photos.restoreFromObject(exampleSave);

    Router.transitionTo('editor');
  },

  tabSwitch: function(event){
    var activate = event.target.getAttribute('data-tab');
    this.setState({activeTab: activate});
  },

  render: function () {
    var Link = this.renderLink();

        return (
            <div className="about">
              <header className="section first">
                <h1>{text.title}</h1>
                <div className="imageContainer">
                  <img src="images/gameboy.png" />
                </div>
                <SaveFileUpload></SaveFileUpload>
              </header>
              <aside className="section second">
                <b>{text.strapline}</b>
                <p onClick={this.prepopulate}>{text.prepopulate}</p>
                <p></p>
              </aside>
              <main className="section third">
                <div className="tabsContainer">

                  <h1>How</h1>
                  <p className="howText">Wondering how to get photos off your camera? Here are some options:</p>

                  <div className="tabs">
                    <ul className="tabset">
                      <li onClick={this.tabSwitch} data-tab="cartridge"className={(this.state.activeTab === 'cartridge')? 'active' : 'hide'}>{text.methodTitles.cartridge}</li>
                      <li onClick={this.tabSwitch} data-tab="madcatz" className={(this.state.activeTab === 'madcatz')? 'active' : 'hide'}>{text.methodTitles.madcatz}</li>
                      <li onClick={this.tabSwitch} data-tab="printer" className={(this.state.activeTab === 'printer')? 'active' : 'hide'}>{text.methodTitles.scanner}</li>
                      <li onClick={this.tabSwitch} data-tab="other" className={(this.state.activeTab === 'other')? 'active' : 'hide'}>{text.methodTitles.other}</li>
                    </ul>
                    <div id="cartridge" className={(this.state.activeTab === 'cartridge')? 'active' : 'hide'}>{text.methods.cartridge}</div>
                    <div id="madcatz" className={(this.state.activeTab === 'madcatz')? 'active' : 'hide'}>{text.methods.madcatz}</div>
                    <div id="printer" className={(this.state.activeTab === 'printer')? 'active' : 'hide'}>{text.methods.scanner}</div>
                    <div id="other" className={(this.state.activeTab === 'other')? 'active' : 'hide'}>{text.methods.other}</div>
                  </div>
                </div>
              </main>
              <footer className="section fourth">
                  <p>
                    Made by <a href="https://twitter.com/eddhannay">@eddhannay</a>. Design by <a href="#">Derek Boateng</a>
                    <br />2014
                  </p>
              </footer>

          </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = About;
