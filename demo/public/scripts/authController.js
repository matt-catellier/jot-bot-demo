(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('AuthController', AuthController);


    function AuthController($auth, $state) {

        var vm = this; // this is the auth controller itself

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            };
            // console.log(credentials);
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(resp) {
                // If login is successful, redirect to the users state
                console.log(resp);
                $state.go('users', {});
            });
        }

    }

})();