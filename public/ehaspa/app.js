var eha = angular.module('eha', [])
    .config(function($routeProvider) {
        $routeProvider.when('/home',
            {
                templateUrl: 'templates/default.html',
                controller: 'IndexController'
            })
        $routeProvider.when('/doctors',
            {
                templateUrl: 'templates/doctors.html',
                controller: 'DoctorsController'
            })
        $routeProvider.when('/consultation',
            {
                templateUrl: 'templates/consultation.html',
                controller: 'ConsultationController'
            })

    })