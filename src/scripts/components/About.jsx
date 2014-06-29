/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var SaveFileUpload = require('../components/SaveFileUpload.jsx');
var Link = require('react-nested-router').Link;
var Photos = require('../libs/photoStore');

require('../../styles/About.css');

var About = React.createClass({
  renderLink: function () {
    if (Photos.length > 0){
      return (<Link to="editor">Go to editor</Link>)
    }
  },

  render: function () {
    var Link = this.renderLink();

        return (
            <div className="about">
              <aside className="tophero">
                  <img src="images/home/hero.webp" width="1366" height="768" />
                  <div className="lead">
                    <h1>Thinger</h1>
                    <p>Upload your Gameboy Camera photos</p>
                    <p>{Link}</p>
                    <SaveFileUpload></SaveFileUpload>
                   </div>
              </aside>
              <main className="instructions block">
                <h1>Using this site</h1>
                <p className="lead">This site will extract photos from your Gameboy Save File</p>
                <p>To use it, you&rsquo;ll need a .sav file from your Gameboy Camera. If you don&rsquo;t have one yet, skip down to the <a href="#why">How</a> section.</p>

                <h2>How?</h2>
                <ul className="gallery">
                  <li>
                    <img src="../images/home/printer.webp" width="128" alt="" />
                    <p>Printer</p>
                  </li>
                  <li>
                    <img src="../images/home/madcatz.webp" width="128" alt="" />
                    <p>Madcatz printer cable</p>
                  </li>
                  <li>
                    <img src="../images/home/cart.webp" width="128" alt="" />
                    <p>Cartridge reader</p>
                  </li>
                </ul>

                <p>The hard bit is getting the save file off your Gameboy Cartridge.</p>
                <h3>USB Cartridge reader</h3>
                <p>This is the best way &rsquo; with a caveat, that they're a bit hard to get hold of. There's the <a href="http://www.gameboycarts.com/2009/11/smartboy-32-mb-flash-cart-review/">Smartboy cartridge reader</a>. There was the Bleep Bloop programmer.</p>
                <p><a href="http://store.kitsch-bent.com/category/cartridges-programmers">Kitsch Bent</a> is a good place to keep an eye out for progammers in the future. Failing that, uh, eBay?</p>
                <h3>Official Gameboy Printer</h3>
                <p>You could simply use the official printer to print off the photos, and scan them in.</p>
                <h3>Madcatz Camera Link</h3>
                <p>If you still have a PC with a parallel port and Windows 95, The Madcatz camera link is the product for you. Simply plug the cable in to your Gameboy link port, the other end in to your PC, and the software emulates the Gameboy Printer.</p>
                <p>Doing it this way does get you the olde official borders for free, but otherwise &mdash; man, it&rsquo;s a lot of hassle.</p>
              </main>
              <aside className="hero block illustration">
                <ul className="gallery">
                  <li><a href="https://www.flickr.com/photos/eddhannay/4786292116/in/set-72157622902495793"><img src="../images/h-1.png" alt="" /></a></li>
                  <li><a href="https://www.flickr.com/photos/eddhannay/4898318806/in/set-72157622902495793"><img src="../images/h-2.png" alt="" /></a></li>
                  <li><a href="https://www.flickr.com/photos/eddhannay/6847188924/in/set-72157622902495793"><img src="../images/h-3.png" alt="" /></a></li>
                </ul>
              </aside>
              <footer>
                  <p>Made by <a href="https://twitter.com/eddhannay">@eddhannay</a>, 2014. </p>
              </footer>

          </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = About;
