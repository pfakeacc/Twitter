//loading the 'login' angularJS module
var tweet = angular.module('retweetApp', []);
//defining the login controller
//alert("Init2");
tweet.controller('retweetCtrl', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	//$scope.message = "Test";
	$scope.submit = function() {
		//alert("SSS");
		$http({
			method : "POST",
			url : '/tweet',
			data : {
				"tweet" : $scope.inputMessage
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				
			}
			else{
				$scope.regForm = true;
				$scope.reg_success = false;
				parent.document.location.assign("/homepage"); 
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.username_email_exists = true;
		});
		
	};
});

//angular.bootstrap(document.getElementById("tweetId//"),['tweetApp']);


