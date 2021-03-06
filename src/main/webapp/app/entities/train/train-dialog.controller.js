(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('TrainDialogController', TrainDialogController);

    TrainDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Train', 'Principal', 'LoginService'];

    function TrainDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Train, Principal, LoginService) {
        var vm = this;

        vm.train = entity;
        vm.clear = clear;
        vm.save = save;

        Principal.identity().then(function (user) {
            var data = {
                user: user.login
            };
            vm.train.userid = data.user;
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.train.id !== null) {
                Train.update(vm.train, onSaveSuccess, onSaveError);
            } else {
                Train.save(vm.train, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jhipstermonolithApp:trainUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

    }
})();
