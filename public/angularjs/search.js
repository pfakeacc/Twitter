//loading the 'login' angularJS module
var ssearch = angular.module('search', []);
//defining the login controller
ssearch.controller('search', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/search',
			data : {
				"searchparam" : $scope.search
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/search23"); 
		}).error(function(error) {
			
		});
	};
})

    