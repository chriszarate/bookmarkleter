'use strict';

var angular = require('angular');
var bookmarkleter = require('./bookmarkleter');

var app = angular.module('bookmarkleter', []);

app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/./);
}]);

app.controller('appController', ['$scope', function ($scope) {

  $scope.options = {
    urlencode: true,
    anonymize: true,
    mangleVars: true,
    jQuery: false
  };

  $scope.error = null;

  $scope.updateBookmarklet = function (options) {

    var code = $scope.input;

    if (!code) {
      return;
    }

    // Make a bookmarklet and show to user. Capture parse errors.
    try {
      $scope.output = bookmarkleter(code, options);
      $scope.error = null;
    } catch (err) {
      $scope.error = err.message;
      $scope.output = null;
      return;
    }

  };

}]);
