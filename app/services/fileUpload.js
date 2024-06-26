/**
 * Created by Antony Repin on 8/9/2017.
 */

angular.module('AdminApp')
  .service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function () {
        })
        .error(function () {
        });
    }
  }]);
