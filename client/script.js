var app = angular.module("App", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl: "search.html",
		controller: "SearchController as vm",
	}).when("/:station", {
		templateUrl: "station.html",
		controller: "StationController as vm",
	});
});

app.service("FavoriteService", function($http) {
	var vm = this;

	vm.data = [];

	$http.get("http://localhost:45454/api/favourites/1").then(function(response) {
		for(var i = 0; i < response.data.length; i++) {
			vm.data.push(response.data[i]);
		}
	});
});

app.controller("FavoriteController", function(FavoriteService, $location) {
	var vm = this;

	vm.favorites = FavoriteService.data;

	vm.open = function(station) {
		$location.path(station.name);
	}
});

app.controller("SearchController", function($location) {
	var vm = this;

	vm.search = function() {
		$location.path(vm.station);
	}
});

app.controller("StationController", function($routeParams, FavoriteService, $http) {
	var vm = this;

	vm.stations = [];

	$http.get("http://localhost:45454/api/station/" + $routeParams.station).then(function(response) {
		vm.stations = response.data.stations;
		vm.json = JSON.stringify(vm.stations, null, 2);
	});

	function favorite(station) {
		$http.post("http://localhost:45454/api/favourites", {
			user: "1",
			name: station.name,
			number: station.number,
		}).then(function(response) {
			FavoriteService.data.push(response.data);
		});
	}

	vm.favorite = favorite;
});
