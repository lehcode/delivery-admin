'use strict';

describe('AdminApp.version module', function() {
  beforeEach(module('AdminApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
