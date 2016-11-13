//loading the 'login' angularJS module
var signup = angular.module('signupApp', []);
//defining the login controller
//alert("Init2");
signup.controller('signupCtrl', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	//$scope.message = "Test";
	$scope.regForm = false;
	$scope.reg_success = true;
	$scope.username_email_exists = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/signup',
			data : {
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"username" : $scope.username,
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.username_email_exists = false;
				$scope.unexpected_error = true;
			}
			else{
				$scope.regForm = true;
				$scope.reg_success = false;
				
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.username_email_exists = true;
		});
		
	};
});

angular.bootstrap(document.getElementById("do-signup"),['signupApp']);


