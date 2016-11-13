/**
 * Routes file for Signup
 */
var ejs = require("ejs");
var mysql = require('./mysql');
var session = require('client-sessions');

exports.sendtweet = function(req,res)
{
	console.log("tweet.js Inside tweet()");
	var userid = req.session.userid;
	console.log("tweet.js userid"+ userid);
	// check user already exists
	var tweet = req.param("tweet");
	/*	
	 */
	var insertTweetId=0;

	var insertTweet="insert into tweets values(NULL,'" + userid +"','" + req.param("tweet") +"',CURRENT_TIMESTAMP)";
	console.log("tweet.js insertTweet is ....."+insertTweet);





	String.prototype.parseURL = function() {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
			return url.link(url);
		});
	};
	String.prototype.parseUsername = function() {
		return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
			var username = u.replace("@","");

			var checkUsername="SELECT * FROM users where username='"+username+"';";
			console.log("gettweetidquery is "+insertTweet);
			mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0){
						//username exists
						console.log("tweet.js username exists "+insertTweetId);
						userId = results[0].id;
						var userTweet="INSERT INTO tweetentry values(NULL,'"+insertTweetId+"','"+userId+"',NULL);";
						console.log("tweet.js userTweet is "+userTweet);
						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
								//insertTweetId = results[0].id;
								console.log("username entered in tweet table");
							}
						},userTweet);
					}
					
					json_responses = {"statusCode" : 101};
					res.send(json_responses);
					console.log("gettweetid is "+insertTweetId);
				}
			},checkUsername);
			//return u.link("/profile?username="+username);
		});
	};

	String.prototype.parseHashtag = function() {
		console.log("tweet.js parsing Hashtag");
		console.log("tweet.js insertTweetId is "+insertTweetId);
		return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			var tag = t.replace("#","");

			var checkHashtag="select * from hashtag where hashtag='" + tag +"'";
			console.log("tweet.js checkHashtag:"+checkHashtag);
			mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					console.log("tweet.js results.length "+results.length);
					if(results.length > 0){
						//Hashtag already here
						console.log("tweet.js Hashtag already present");
						var gethashtagId="SELECT id FROM hashtag where hashtag='"+tag+"';";
						console.log("tweet.js gettweetidquery is "+insertTweet);
						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
								hashtagId = results[0].id;
								var hashtagTweet="INSERT INTO tweetentry values(NULL,'"+insertTweetId+"',NULL,'"+hashtagId+"');";
								console.log("tweet.js insertTweetId is "+insertTweetId);
								mysql.fetchData(function(err,results){
									if(err){
										throw err;
									}
									else 
									{
										//insertTweetId = results[0].id;
										json_responses = {"statusCode" : 101};
										res.send(json_responses);
										console.log("tweet.js insertTweetId is "+insertTweetId);
									}
								},hashtagTweet);
							}
						},gethashtagId);

						//json_responses = {"statusCode" : 101};
						//res.send(json_responses);
					}
					else{
						//Create the new hashtag
						console.log("tweet.js tweet.js Create new Hashtag");
						var insertNewHashtag="INSERT into hashtag values (NULL,'"+tag+"');";
						console.log("tweet.js insertNewHashtag is "+insertNewHashtag);
						mysql.fetchData(function(err,results){
							if(err){
								throw err;
							}
							else 
							{
								//hashtagId = results[0].id;
								var gethashtagId="SELECT id FROM hashtag where hashtag='"+tag+"';";
								console.log("tweet.js gethashtagId is "+gethashtagId);
								mysql.fetchData(function(err,results){
									if(err){
										throw err;
									}
									else 
									{
										hashtagId = results[0].id;
										var hashtagTweet="INSERT INTO tweetentry values(NULL,'"+insertTweetId+"',NULL,'"+hashtagId+"');";
										console.log("tweet.js insertTweetId is "+insertTweetId);
										mysql.fetchData(function(err,results){
											if(err){
												throw err;
											}
											else 
											{
												//insertTweetId = results[0].id;
												json_responses = {"statusCode" : 101};
												res.send(json_responses);
												console.log("tweet.js insertTweetId is "+insertTweetId);
											}
										},hashtagTweet);
									}
								},gethashtagId);
							}
						},insertNewHashtag);

					}
				}
			},checkHashtag);
			//return t.link("hashtag?hashtag="+tag);
		});
	};
















	mysql.fetchData(function(err,results){
		console.log("Inside fetchdata");
		if(err){
			console.log("tweet.js Some Error");
			throw err;
		}
		else 
		{
			console.log("tweet.js No Error");
			var getTweetId="SELECT id FROM tweets where tweets='"+req.param("tweet")+"' ORDER by id desc;";
			console.log("tweet.js gettweetidquery is "+insertTweet);
			mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					insertTweetId = results[0].id;
					json_responses = {"statusCode" : 101};
					res.send(json_responses);
					console.log("tweet.js insertTweetId is "+insertTweetId);
					tweet.parseHashtag().parseUsername();
				}
			},getTweetId);

			json_responses = {"statusCode" : 101};
			res.send(json_responses);
		}
	},insertTweet);


}

exports.retweet = function(req,res)
{
	var getreTweet="SELECT * FROM tweets where id='"+req.param("tweetid")+"';";
	console.log("getreTweet is "+getreTweet);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			//insertTweetId = results[0].id;
			//json_responses = {"statusCode" : 101};
			//res.send(json_responses);
			res.render("retweet",{tweet : results[0].tweets });
			//console.log("gettweetid is "+insertTweetId);
		}
	},getreTweet);
}


//Check login - called when '/checklogin' POST call given from AngularJS module in login.ejs
exports.checklogin_bkp = function(req,res)
{
	var username, password;
	username = req.param("username");
	password = req.param("password");

	var json_responses;

	if(username!== ''  && password!== '')
	{
		console.log(username+" "+password);
		if(username === "test" && password === "test")
		{
			//Assigning the session
			req.session.username = username;
			console.log("tweet.js Session initialized");
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
		}
		else
		{
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
		}
	}
	else
	{
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
	}
};


//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};


//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
