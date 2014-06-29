function dragProxy(){
  this.dragging = false;

  return this;
}

dragProxy.prototype.onDragStart = function(object){
  this.dragging = object;
};

dragProxy.prototype.onDragEnd = function() {
  return this.dragging;
};

module.exports = new dragProxy();