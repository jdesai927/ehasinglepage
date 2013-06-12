function ConsultationController($scope) {
  //TODO: get doctors and bind
  $scope.doctors = [ {
                        name: "Dr. Cow",
                        imglink: "http://tux.crystalxp.net/png/zafx-cow-tux-19307.png",
                        profilelink: "https://en.wikipedia.org/wiki/Cattle",
                        specialty: "Udder Destruction"
                     },
                     {
                        name: "Stephen Strange",
                        imglink: "http://upload.wikimedia.org/wikipedia/en/thumb/9/95/Dr_Strange_by_Steve_Ditko.jpg/250px-Dr_Strange_by_Steve_Ditko.jpg",
                        profilelink: "http://en.wikipedia.org/wiki/Doctor_Strange",
                        specialty: "World Domination"
                     }]
}
