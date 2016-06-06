(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('AuthController', AuthController);


    function AuthController($auth, $state, $http, $rootScope) {

        var vm = this; // this is the auth controller itself

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            };
            // console.log(credentials);
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function() {
                // If login is successful, redirect to the users state
                return $http.get('api/authenticate/user')

                // $state.go('users', {});
            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;

                // Because we returned the $http.get request in the $auth.login
                // promise, we can chain the next promise to the end here
            }).then(function(response) {

                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('users');
            });
        }

    }

})();