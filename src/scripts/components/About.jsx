/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/About.css');

var About = React.createClass({
  /*jshint ignore:start */
  render: function () {
        return (
            <div className="about">
              <aside className="hero block">
                  <p>hero</p>
              </aside>
              <main className="instructions block">
                <h1>Using this site</h1>
                <p className="lead">This site will extract photos from your Gameboy Save File</p>
                <p>To use it, you&rsquo;ll need a .sav file from your Gameboy Camera. If you don&rsquo;t have one yet, skip down to the <a href="#why">How</a> section.</p>
              </main>
              <aside className="hero block illustration">
                <ul className="gallery">
                  <li><img src="../images/h-1.png" alt="" /></li>
                  <li><img src="../images/h-2.png" alt="" /></li>
                  <li><img src="../images/h-3.png" alt="" /></li>
                  <li><img src="../images/h-4.png" alt="" /></li>
                </ul>
              </aside>
              <main className="instructions block">
                <h2>How?</h2>
                <p>Morbi fermentum, odio sit amet feugiat auctor, odio ligula aliquam augue, non venenatis tellus mi vel nibh. Vestibulum cursus orci vitae orci vulputate, quis malesuada arcu posuere. Vestibulum nunc est, vestibulum nec gravida at, elementum quis eros. Integer porta convallis nisi. Vestibulum vitae turpis vitae leo elementum bibendum eu in lorem. Donec consectetur sapien ut justo ultricies hendrerit. Fusce quis auctor nisi. Duis nisl lacus, dictum eu tempus ac, gravida quis massa. Proin eros neque, fringilla vitae bibendum varius, congue vitae massa. Mauris adipiscing elementum fringilla. In placerat sapien massa, id pellentesque sem venenatis et.</p>
              </main>
              <aside className="hero block illustration">

              </aside>
          </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = About;
