jest.dontMock('../flux-util');
var FluxUtil = require('../flux-util');

describe('FluxUtil', function() {

  describe('createDispatcher', function() {
    it('defines a dispatcher with view and server fns', function() {
      var dispatcher = FluxUtil.createDispatcher();
      expect(dispatcher.handleViewAction).toBeDefined();
      expect(dispatcher.handleServerAction).toBeDefined();
    })
  });

  describe('dispatchFnFor', function() {
    it('returns a function that passes a payload to dispatcher', function() {
      var dispatcher = FluxUtil.createDispatcher();
      dispatcher.handleServerAction = jest.genMockFn();
      var dispatch = FluxUtil.dispatchFnFor(dispatcher);
      var payload = {actionType: "ABC", response: "hello", queryParams: {q: "hi"}};

      dispatch(payload.actionType, payload.response, payload.queryParams);
      expect(dispatcher.handleServerAction).toBeCalledWith(payload);
    });
  });

  describe('handleResponseFnFor', function() {
    it('returns a function that returns a function to handle a server response', function() {
      var dispatch = jest.genMockFn();
      var options = {key: 'ABC', params: {q: "HI"}};
      var handleResponseFn = FluxUtil.handleResponseFnFor(dispatch);
      response = {status: 200, body: {name: "brent"}};

      handleResponseFn(options.key, options.params)(response);
      expect(dispatch).toBeCalledWith(options.key, response.body, options.params); 
    });
  });

  describe('createStore', function() {
    it('creates a FluxStore that extends from the EventEmitter prototype with change methods', function() {
      var store = FluxUtil.createStore({});
      expect(store.emitChange).toBeDefined();
      expect(store.on).toBeDefined();
    });
  });

});
