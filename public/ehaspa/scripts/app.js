var eha = angular.module('eha', ['ngResource'])
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
        $routeProvider.when('/healthrecord',
            {
                templateUrl: 'ehaspa/templates/healthrecord.html',
                controller: 'HealthRecordController'
            })
        $routeProvider.when('/consultconnect',
            {
                templateUrl: 'ehaspa/templates/consultconnect.html',
                controller: 'ConsultConnectController'
            })
        $routeProvider.when('/userDashboard',
            {
                templateUrl: 'ehaspa/templates/dashboard.html',
                controller: 'DashboardController'
            })
      $routeProvider.otherwise({
          templateUrl: 'ehaspa/templates/default.html',
          controller: 'IndexController'
      })
    })