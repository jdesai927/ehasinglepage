angular.module('eha', ['ngResource'])
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
        $routeProvider.when('/healthrecord',
            {
                templateUrl: 'templates/healthrecord.html',
                controller: 'HealthRecordController'
            })
        $routeProvider.when('/consultconnect',
            {
                templateUrl: 'templates/consultconnect.html',
                controller: 'ConsultConnectController'
            })
        $routeProvider.when('/dashboard',
            {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardController'
            })

    })