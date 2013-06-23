function ViewConsultationsController($scope, $http) {
    $scope.isDoctor = true //TODO: set based on session
    $scope.id = 0 //TODO: set based on session and isDoctor
    //var Consultation = $resource('/consultations/:queryAction', {doctor_id: 0})
    if (!$scope.isDoctor) {
        $scope.persontext = "Doctor name"
        $http({method: 'GET', url:'/consultations/findUserConsultationsByPatientID', params: {patientId: '0'}})
            .success(function(data) {
              $scope.appointments = data
            })
            .error(function() {
              console.log("error retrieving consultation data!")
            })
    } else {
        $scope.persontext = "Patient name"
        $http({method: 'GET', url:'/consultations'})
            .success(function(data) {
                $scope.appointments = data
            })
            .error(function() {
                console.log("error retrieving consultation data!")
            })
    }
    /*
    $scope.appointments = [
        {
            id: 0,
            doctor_id: 0,
            patient_id: 1,
            time: "today",
            reason: "abdominal pain",
            approved: true,
            canceled: false,
            unapproved: false,
            rowclass: "success"
        },
        {
            id: 1,
            doctor_id: 0,
            patient_id: 2,
            time: "tomorrow",
            reason: "wisdom tooth",
            approved: false,
            canceled: false,
            unapproved: true,
            rowclass: "warning"
        }
    ]
    */
    //$scope.appointmentfilter = { doctor_id: 0 } //TODO: set based on session
    $scope.approve = function(b, appointment) {
        appointment.unapproved = false
        if (!b) {
            appointment.canceled = true
            appointment.rowclass = "error"
        }
        appointment.approved = b && appointment.approved
        for (i = 0; i < $scope.appointments.length; i++) {
            if ($scope.appointments[i].id == appointment.id) {
                $scope.appointments[i].approved = b && $scope.appointments.approved
                $scope.appointments[i].rowclass = b ? "success" : "error"
                //TODO: update approval status in database
            }
        }
    }
}

angular.module('eha').controller('ViewConsultationsController', ViewConsultationsController)
