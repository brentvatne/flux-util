var EventEmitter = require('wolfy87-eventemitter');
var extend = require('lodash').extend;

var FluxStore = extend(EventEmitter.prototype, {
  emitChange: function(data) {
    this.emit('change', data);
  },

  addChangeListener: function(callback) {
    this.on('change', callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
  }
});

module.exports = FluxStore;
