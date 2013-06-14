var eha = angular.module('eha', [])
    .config(function($routeProvider) {
        $routeProvider.when('/home',
            {
                templateUrl: 'ehaspa/templates/default.html',
                controller: 'IndexController'
            })
        $routeProvider.when('/doctors',
            {
                templateUrl: 'ehaspa/templates/doctors.html',
                controller: 'DoctorsController'
            })
        $routeProvider.when('/consultation',
            {
                templateUrl: 'ehaspa/templates/consultation.html',
                controller: 'ConsultationController'
            })
        $routeProvider.when('/viewconsultations',
            {
                templateUrl: 'ehaspa/templates/viewconsultations.html',
                controller: 'ViewConsultationsController'
            }
        )

    })