var app = angular.module("App", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl: "search.html",
		controller: "SearchController as ctrl",
	}).when("/:station", {
		templateUrl: "station.html",
		controller: "StationController as ctrl",
	});
});

app.service("FavoriteService", function() {
	var vm = this;

	vm.data = [{
		name: "Hrastje",
		link: "Hrastje",
	}, {
		name: "Bavarski dvor",
		link: "Bavarski_dvor",
	}];
});

app.controller("FavoriteController", function(FavoriteService) {
	var vm = this;

	vm.favorites = FavoriteService.data;
});

app.controller("SearchController", function($location) {
	var vm = this;

	function search() {
		$location.path(vm.station);
	}

	vm.search = search;
});

app.controller("StationController", function($routeParams, FavoriteService, $http) {
	var vm = this;

	$http.get("http://www.trola.si/Hrastje").then(function(data) {
		vm.data = data;
	});

	vm.station = $routeParams.station;

	function favorite() {
		FavoriteService.data.push({
			name: "Test 123",
			link: "Test_123",
		});
	}

	vm.favorite = favorite;
});
