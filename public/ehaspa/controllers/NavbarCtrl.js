function NavbarController($scope) {
    $scope.pages = [{name: "Home", link: "home"},
                    {name: "Doctors", link: "doctors"},
                    {name: "Make Appointment", link: "consultation"},
                    {name: "View Appointments", link: "viewconsultations"},
                    {name: "View Health Records", link: "healthrecord"}]
}
