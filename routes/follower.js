/**
 * Routes file for Login
 */
var ejs = require("ejs");
var mysql = require('./mysql');
var session = require('client-sessions');

exports.checkfollower = function(req,res)
{
	// check user already exists
	var getUser="select * from followers where user1='"+req.session.userid+"' and user2='" + req.param("user2") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log(req.param("user2")+" is a follower of "+req.param("user2"));
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
				//console.log("Session initialized is "+results[0].id);
				//req.session.userid = results[0].id;
				//req.session.username = results[0].username;
				
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
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
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	},getUser);
}

exports.getfollowers = function(req,res)
{
	// check user already exists
	var getUser="select * from followers where user2='" + req.param("user") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log(req.param("user2")+" is a follower of "+req.param("user2"));
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
				//console.log("Session initialized is "+results[0].id);
				//req.session.userid = results[0].id;
				//req.session.username = results[0].username;
				
				/*json_responses = {"statusCode" : 200};
				res.send(json_responses);*/
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
				
			}
			json_responses = {"followers" : results.length };
			res.send(json_responses);
		}  
	},getUser);
}


exports.getfollowing = function(req,res)
{
	// check user already exists
	var getUser="select * from followers where user1='" + req.param("user") +"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log(req.param("user2")+" is a follower of "+req.param("user2"));
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
				//console.log("Session initialized is "+results[0].id);
				//req.session.userid = results[0].id;
				//req.session.username = results[0].username;
				
				/*json_responses = {"statusCode" : 200};
				res.send(json_responses);*/
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
				
			}
			json_responses = {"following" : results.length };
			res.send(json_responses);
		}  
	},getUser);
}




exports.getfollowerslist = function(req,res)
{
	// check user already exists
	console.log("/////////////////////////////////"+ req.param("user"));
	var getUser="select username from users where id in (select user1 from followers where user2='" + req.param("user") +"')";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log(req.param("user2")+" is a follower of "+req.param("user2"));
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
				//console.log("Session initialized is "+results[0].id);
				//req.session.userid = results[0].id;
				//req.session.username = results[0].username;
				
				/*json_responses = {"statusCode" : 200};
				res.send(json_responses);*/
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
				
			}
			res.render("getfollowerslist",{data : results });
			//res.send(json_responses);
		}  
	},getUser);
}

exports.getfollowinglist = function(req,res)
{
	// check user already exists
	console.log("/////////////////////////////////"+ req.param("user"));
	var getUser="select username from users where id in (select user2 from followers where user1='" + req.param("user") +"')";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				//console.log(req.param("user2")+" is a follower of "+req.param("user2"));
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
				//console.log("Session initialized is "+results[0].id);
				//req.session.userid = results[0].id;
				//req.session.username = results[0].username;
				
				/*json_responses = {"statusCode" : 200};
				res.send(json_responses);*/
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
				
			}
			res.render("getfollowerslist",{data : results ,status:"Followers"});
			//res.send(json_responses);
		}  
	},getUser);
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
