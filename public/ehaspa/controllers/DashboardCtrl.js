function DashboardController($scope) {
    $scope.pages = [{name: "Account", children: [{name: "Logout", link: "logout"}, {name: "Login", link: "login"}]},
        {name: "Doctors", children: [{name: "View Doctors", link: "doctors"}]},
        {name: "Appointments", children: [{name: "Make Appointment", link: "consultation"}, {name: "View Appointments", link: "viewconsultations"}]},
        {name: "View Health Records", children: [{name: "View Health Records", link: "healthrecord"}]},
        {name: "Consult Doctor", children: [{name: "Consult Doctor", link: "consultconnect"}]}]
}
