var _ = require('underscore');
var Dispatcher = require('flux').Dispatcher;
var FluxStore = require('./flux-store');
var ApiConstants = require('./api-constants');

var FluxUtil = {
  defineConstants: function(constantNames) {
    var constants = {};
    constantNames.forEach(function(constantName) {
      constants[constantName] = constantName;
    });

    return constants;
  },

  apiHelpersFor: function(dispatcher) {
    var dispatch = FluxUtil.dispatchFnFor(dispatcher),
        handleResponse = FluxUtil.handleResponseFnFor(dispatch);

    return {dispatch: dispatch, handleResponse: handleResponse};
  },

  dispatchFnFor: function(dispatcher) {
    return function(key, response, params) {
      var payload = {
        actionType: key,
        response: response,
        queryParams: params
      };

      dispatcher.handleServerAction(payload);
    }
  },

  handleResponseFnFor: function(dispatch) {
    return function(key, params) {
      return function(response) {
        if (response.status == 200) {
          dispatch(key, JSON.parse(response._bodyText), params)
        } else {
          dispatch(key, ApiConstants.ERROR, params)
        }
      }
    }
  },

  createDispatcher: function(options) {
    var dispatcher;

    // Default create a handleViewAction function
    options = options || {
      handleViewAction: function(action) {
        this.dispatch({
          source: 'VIEW_ACTION',
          action: action
        })
      },

      handleServerAction: function(action) {
        this.dispatch({
          source: 'SERVER_ACTION',
          action: action
        })
      }
    }

    dispatcher = _.extend(Dispatcher.prototype, options);
    dispatcher.constructor();
    return dispatcher;
  },

  createStore: function(options) {
    return _.extend(_.clone(FluxStore), options);
  }
}

module.exports = FluxUtil;
