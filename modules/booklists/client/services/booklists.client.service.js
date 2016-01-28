'use strict';

//Booklists service used for communicating with the categories REST endpoints
angular.module('booklists').factory('Booklists', ['$resource',
  function ($resource) {
    return $resource('api/booklists/:booklistId', {
      booklistId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


angular.module('booklists').service('ConfirmService', function($modal) {
  var service = {};
  service.open = function (text, onOk) {
    var modalInstance = $modal.open({
      templateUrl: '/modules/booklists/client/views/confirm.template.html',
      controller: 'ModalConfirmCtrl',
      resolve: {
        text: function () {
          return text;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      onOk();
    }, function () {
    });
  };
  
  return service;
});

angular.module('booklists').controller('ModalConfirmCtrl', function ($scope, $modalInstance, text) {

  $scope.text = text;

  $scope.ok = function () {
    $modalInstance.close(true);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
