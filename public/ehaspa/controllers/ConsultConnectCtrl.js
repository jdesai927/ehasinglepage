function ConsultConnectController($scope) {
    $scope.menuItems = [{name: "Consultation", children: ["foo", "bar"]},
                        {name: "Health Record", children: ["baz", "foo"]},
                        {name: "Other info", children: ["bar", "baz"]}]
}
