//loading the 'login' angularJS module
var pupdate = angular.module('profileuApp', []);
//defining the login controller
//alert("Init2");
pupdate.controller('profileuCtrl', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	//$scope.message = "Test";
	//$scope.regForm = false;
	$scope.reg_success = true;
	$scope.username_email_exists = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/profileupdate',
			data : {
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"location" : $scope.location,
				"contact" : $scope.contact
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				$scope.reg_success = false;
				$scope.unexpected_error = true;
			}
			else{
				$scope.regForm = true;
				$scope.reg_success = true;
				
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/"); 
		}).error(function(error) {
			
			$scope.username_email_exists = true;
		});
		
	};
});

angular.bootstrap(document.getElementById("do-signup"),['signupApp']);


