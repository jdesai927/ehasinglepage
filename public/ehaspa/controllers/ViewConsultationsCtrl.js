function ViewConsultationsController($scope) {
    $scope.isDoctor = true //TODO: set based on session
    if (!$scope.isDoctor) {
        $scope.persontext = "Patient name"
    } else {
        $scope.persontext = "Doctor name"
    }
    $scope.appointments = [
        {
            id: 0,
            doctor_id: 0,
            patient_id: 1,
            time: "today",
            reason: "abdominal pain",
            approved: true
        },
        {
            id: 1,
            doctor_id: 0,
            patient_id: 2,
            time: "tomorrow",
            reason: "wisdom tooth",
            approved: false
        }
    ]
    $scope.appointmentfilter = { doctor_id: 0 } //TODO: set based on session
    $scope.approve = function(appointment, id) {
        appointment.approved = !appointment.approved
        for (i = 0; i < $scope.appointments.length; i++) {
            if ($scope.appointments[i].id = id) {
                $scope.appointments[i].approved = !$scope.appointments.approved
                //TODO: update approval status in database
            }
        }
    }
}
