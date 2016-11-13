/**
 * Routes file for Login
 */
var ejs = require("ejs");
var mysql = require('./mysql');
var session = require('client-sessions');

exports.index = function(req,res)
{
	console.log("homepage.js sessionid "+req.session.userid);
	// check user already exists
	
	
	//var getTweets="select * from tweets where userid='"+req.session.userid+"' or userid in (select user2 from followers where user1='" + req.session.userid +"') order by id desc ";
	var getTweets="select a.id, a.userid, a.tweets, DATE_FORMAT(a.date, '%m/%d/%Y') as date, b.username from (select * from tweets where userid='"+req.session.userid+"' or userid in (select user2 from followers where user1='"+req.session.userid+"')) a inner join (select * from users)b on a.userid = b.id order by a.id desc";
	console.log("Query is:"+getTweets);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				/*ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
				*/
				//req.session.username = results[0].id;
				//var data = results;
				
				
				
				
				
				String.prototype.parseURL = function() {
					return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
						return url.link(url);
					});
				};
				String.prototype.parseUsername = function() {
					return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
						var username = u.replace("@","")
						//alert(username);
						return u.link("/profile?username="+username);
					});
				};
				String.prototype.parseHashtag = function() {
					return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
						var tag = t.replace("#","")
						//alert(tag);
						return t.link("hashtag?hashtag="+tag);
					});
				};
				//console.log("Session initialized is "+results[0].id);
				for(i=0;i<results.length;i++){
					temp_tweet = results[i].tweets;
					console.log(temp_tweet);
					results[i].tweets = temp_tweet.parseURL().parseUsername().parseHashtag();
				}
				console.log("Session initialized is "+results[0].id);
				req.session.userid = req.session.userid;
				req.session.username = req.session.username;
				res.render('homepage', { username: req.session.username, firstname: req.session.firstname, lastname: req.session.lastname, contact: req.session.contact, location: req.session.location, data: results });
				json_responses = {"statusCode" : 200, data: results};
				//res.send(json_responses);
			}
			else {    
				
				/*console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			    */
				res.render('homepage', { username: req.session.username, firstname: req.session.firstname, lastname: req.session.lastname, contact: req.session.contact, location: req.session.location, data: results });
				//json_responses = {"statusCode" : 401};
				//res.send(json_responses);
			}
		}  
	},getTweets);
	
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
			console.log("Session initialized");
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
