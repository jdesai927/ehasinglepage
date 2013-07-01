function HealthRecordController($scope, $http) {
   $scope.patient_id = 0 //TODO: get from session
    $http({method: 'GET', url:'/health_records/findHealth_RecordByPatId', params: {patientId: '0'}})
        .success(function(data) {
            $scope.health_record = data
        })
        .error(function() {
            console.log("error retrieving consultation data!")
        })
}
