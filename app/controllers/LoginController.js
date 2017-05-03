/**
 * Created by Antony Repin on 02.05.2017.
 */


angular.module('AdminApp')
  .controller('LoginController',
    [
      '$scope',
      '$rootScope',
      '$mdDialog',
      '$q',
      '$http',
      'settings',

      function ($scope,
                $rootScope,
                $state,
                $q,
                $http,
                settings) {

        console.log("Initializing LoginController");

        $scope.$on('$viewContentLoaded', function () {

        });

        /**
         * User object container
         * @type {{}}
         */
        $scope.user = {};

        /**
         * Process user login
         */
        $scope.doLogin = function () {

          if (this.loginForm.$valid) {
            var req = {
              method: 'POST',
              url: settings.apiHost + 'api/admin/' + settings.apiVersion + '/authenticate',
              data: $scope.user,
              headers: {"content-type": "application/json"}
            };

            $http(req)
              .then(function loginCallback(loginResponse) {

                if (loginResponse.status === 200) {
                  if (loginResponse.data.status === 'success') {

                    try {
                      localStorage.setItem('token', loginResponse.data.data.data.attributes.token);
                    } catch (error) {
                      console.error(error.message);
                      return;
                    }

                    Object.assign(req, {
                      method: 'POST',
                      url: settings.apiHost + 'api/admin/' + settings.apiVersion + '/user/me',
                      headers: {
                        "content-type": "application/json",
                        "authorization": "Bearer " + localStorage.getItem('token')
                      }
                    });

                    $http(req)
                      .then(function userDataCallback(userDataResponse) {
                        debugger;
                      });
                  }
                }
              });
          } else {
            this.loginForm.$setDirty();
            var alerts = '';
            $rootScope.getFormErrors(this.loginForm)
              .forEach(function (msg, idx) {
                $scope.formAlerts.push({type: 'danger', msg: msg});
                alerts += msg + "<br/>";
              });
            console.log($scope.formAlerts);
            toastr.options.closeButton = true;
            toastr["error"](alerts, "Login Error");
          }
        }

      }]);
