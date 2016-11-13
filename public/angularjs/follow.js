//loading the 'login' angularJS module
//angular.module('CustomFilter').controller('followBtnCtrl', function($scope) {
var fba = angular.module('followBtnApp', []);
//defining the login controller
fba.controller('followBtnCtrl', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	//alert(req.session.userid2);



	$scope.cmethod="unfollowu();";
	$scope.momethod="unfollowc();";
	$scope.buttonc="btn btn-default";
	$scope.unfollowc = function() {
		//alert("Hi");
		$scope.buttonc="btn btn-danger";
		$scope.status="unfollow";
	};
	$scope.normalbf = function() {
		//alert("Hi");
		$scope.buttonc="btn btn-default";
		$scope.status="following";
	};
	$scope.normalbuf = function() {
		//alert("Hi");
		$scope.buttonc="btn btn-default";
		$scope.status="follow";
	};
	$scope.followu = function() {
		//alert("Hi");
		//alert($('#userid2').val());
		$http({
			method : "POST",
			url : '/follow',
			data : {
				"user2" : $('#userid2').val()
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				//not a follower

				$scope.follow=false;
				$scope.unfollow=true;
				$scope.status="following";


			}
			else{
				//some problem
				$scope.follow=true;
				$scope.unfollow=false;
				$scope.status="follow";

			}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});


	};


	$scope.unfollowu = function() {
		//alert("Unfollowing");
		//alert($('#userid2').val());
		$http({
			method : "POST",
			url : '/unfollow',
			data : {
				"user2" : $('#userid2').val()
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				//not a follower
				$scope.follow=true;
				$scope.unfollow=false;
				$scope.buttonc="btn btn-default";
				$scope.status="follow";




			}
			else{
				//some problem
				$scope.follow=false;
				$scope.unfollow=true;
				$scope.status="following";

			}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});


	};


	$scope.sss = function() {
		//alert("Hi");
		//alert("sss "+$('#userid2').val());

		$http({
			method : "POST",
			url : '/follower',
			data : {
				"user2" : $('#userid2').val()
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				//not a follower
				$scope.follow=true;
				$scope.unfollow=false;
				$scope.status="follow";
			}
			else{
				//follower
				$scope.follow=false;
				$scope.unfollow=true;
				$scope.status="following";
			}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});


	};

	//alert($('#userid2').val());
	/*	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};*/
	$scope.sint = function() {

		
		tuser = $('#userid2').val();
		//alert("tuser "+tuser);
		//$scope.hw="Hi";
		$http({
			method : "post",
			url : '/getfollowers',
			data : {
				"user" : tuser
			}
		}).success(function(data) {
			//checking the response data for statusCode
			//not a follower

			$scope.followers=data.followers;

			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
		}).error(function(error) {

		});

		$http({
			method : "post",
			url : '/getfollowing',
			data : {
				"user" : tuser
			}
		}).success(function(data) {
			//checking the response data for statusCode
			//not a follower

			$scope.following=data.following;

			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
		}).error(function(error) {

		});

	}











});

