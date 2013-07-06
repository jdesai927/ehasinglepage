function ConsultationController($http, $scope, $routeParams) {
  $scope.email = "Email"
  $scope.video = "Video"
  $scope.phone = "Phone"
  $scope.chat = "Chat"
  $scope.setMode = function(mode) {
    $scope.consultation_type = mode
  }
  $scope.submitAppointment = function() {
     var dateCreated = new Date()
     doctor_id = $routeParams.docID
     doctor_name = $routeParams.docName //TODO: fix with spaces
     patient_id = 0 //TODO: set based on session
     patient_name = "Jinesh" //TODO: set based on session
     consultation_date = new Date() //TODO: fix to select correct date from form
     consultation_slot = $scope.consultation_timeslot
     consultation_time = consultation_date.getTime() //TODO: same as prev two
     consultation_type = $scope.consultation_type //TODO: get from form
     var created_by = 0 //TODO: set based on session
     $http({method: 'POST',
            url: '/consultations/addUserConsultations',
            params: {doctor_ID: doctor_id,
                     doctor_name: doctor_name,
                     patient_ID: patient_id,
                     patient_name: patient_name,
                     consultation_date: consultation_date,
                     ConsultationTime: consultation_time,
                     consultation_reason: $scope.consultation_reason,
                     ConsultationType: consultation_type,
                     consultation_slot: consultation_slot,
                     created_by: created_by,
                     status: "Open",
                     dateCreated: dateCreated}
          })
  }
  $http.get('/doctors')
      .success(function(data) {
        $scope.doctors = data
      })
      .error(function(data) {
        console.log("error retrieving doctors")
      })
}
