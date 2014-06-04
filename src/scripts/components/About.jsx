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
            <h1>About this page</h1>
            <p>All about uploading photos</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis erat ac nisi condimentum ultrices. Mauris consequat semper ipsum sollicitudin placerat. Sed quis magna interdum, sollicitudin risus et, vulputate nibh. Ut eget vehicula nisl, quis vehicula risus. Suspendisse potenti. Phasellus sollicitudin felis at diam imperdiet, ac cursus lectus facilisis. Nullam eu tortor porttitor, volutpat felis eu, feugiat libero. Nam eleifend nunc sit amet rutrum rutrum. Morbi dictum auctor nibh. Vestibulum erat ante, tincidunt ac dolor non, cursus porttitor nisi. Praesent sollicitudin cursus elit nec fermentum. Nulla et magna ut velit mollis viverra ut viverra ipsum.</p>
            <p>Nullam posuere nulla id nisl sollicitudin vestibulum nec non lectus. Etiam congue, risus eu rhoncus consectetur, lacus arcu consectetur turpis, dignissim ullamcorper neque sapien at arcu. Integer auctor diam nunc, non ultrices erat luctus vel. Vivamus tristique odio augue, sit amet cursus quam congue et. Sed consectetur diam id purus porttitor, ac viverra tortor rutrum. Curabitur vitae imperdiet lacus. Donec pulvinar turpis eget tellus feugiat gravida. Nullam consequat tempor justo lobortis venenatis. Nulla non tristique magna, ac faucibus eros. Ut scelerisque, felis in interdum aliquam, mauris odio convallis sapien, ac congue mi mauris ut mi. Aliquam tincidunt placerat scelerisque. Nullam convallis tempus dignissim. Praesent porta dui massa, sit amet suscipit odio tempor ac.</p>
            <p>Ut id ultricies nunc, nec fringilla sapien. Fusce vitae convallis ligula. Sed consectetur sapien ut molestie pulvinar. Nullam consequat erat nibh, eget euismod ipsum hendrerit quis. Etiam ut ligula justo. Suspendisse volutpat neque posuere semper consequat. Etiam in tempor sapien, at facilisis justo. Sed dolor diam, mattis id orci ac, volutpat elementum elit.</p>
            <p>Duis sed commodo leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tempus posuere mauris, nec vulputate orci porta in. Nam molestie mollis felis id malesuada. Vivamus fermentum ultricies ipsum, iaculis varius dolor ullamcorper ut. Aenean consectetur aliquam lacus eu porttitor. Cras convallis, tellus in blandit congue, nunc augue venenatis risus, eget tristique dui ligula id dolor. Curabitur ut est in lorem eleifend porttitor. Vivamus imperdiet eget ante eget fringilla. Vestibulum porttitor lobortis hendrerit. Etiam facilisis tellus vel sem aliquet pretium.</p>
            <p>Morbi fermentum, odio sit amet feugiat auctor, odio ligula aliquam augue, non venenatis tellus mi vel nibh. Vestibulum cursus orci vitae orci vulputate, quis malesuada arcu posuere. Vestibulum nunc est, vestibulum nec gravida at, elementum quis eros. Integer porta convallis nisi. Vestibulum vitae turpis vitae leo elementum bibendum eu in lorem. Donec consectetur sapien ut justo ultricies hendrerit. Fusce quis auctor nisi. Duis nisl lacus, dictum eu tempus ac, gravida quis massa. Proin eros neque, fringilla vitae bibendum varius, congue vitae massa. Mauris adipiscing elementum fringilla. In placerat sapien massa, id pellentesque sem venenatis et.</p>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = About;
