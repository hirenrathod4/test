//To implement express
const express = require('express');
const jwt = require('jsonwebtoken');

//Initializing app
const app = express();
//Get Route...1st Page for testing
app.get('/api', (req, res) => 
{1
	//Welcome message
	res.json(
	{
		message: 'Welcome to the API'
	}
	);
});
app.get('/api/summary_email', (req, res) => 
{
	//console.log(req.query.token);
	//res.json(url);
	//res.header('Authorization', `Bearer ${req.query.token}`);
	//request.post({
      //url: 'http://localhost:5000/api/summary',
    //},
    jwt.verify(req.query.token, 'secretkey', (err, authData) => 
	{
		//If error
		if(err)
		{
			//Forbidded message
			res.sendStatus(403);
		}else 
		{
			//Shows user info and jwt details
			res.json(
			{
				message: 'Post Created',
				authData
				//authData
			})
		}
	});
	//return res.redirect('http://localhost:5000/api/summary');
});
//Post route....Will be the summary page after they get the magic link
app.post('/api/summary' , verifyToken , (req, res) => 
{
	//Function that verifies the token
	jwt.verify(req.token, 'secretkey', (err, authData) => 
	{
		//If error
		if(err)
		{
			//Forbidded message
			res.sendStatus(403);
		}else 
		{
			//Shows user info and jwt details
			res.json(
			{
				message: 'Post Created',
				authData
				//authData
			})
		}
	});
});
//Post route....Where everyone selects campus, location, room, time, and enters email
app.post('/api/login' , (req, res) => {
	//Mock User Object
	const user = {
		//Email init
		email : 'hrathod1@student.ohlone.edu'
	}
	//Gives JWT header, payload, and signature....is valid for 30 secs for testing purposes
	jwt.sign({user}, 'secretkey', { expiresIn: '30m' } ,(err, token) => {
		//Displays token for viewing purposes 
	const url = `http://localhost:5000/api/summary/?token=${token}`;
	res.json({url});
	});
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
	//Get auth header value
	const bearerHeader = req.headers['Authorization'];
	console.log(req);
	//Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
		//Split at the Space
		const bearer = bearerHeader.split(' ');
		//Get token from array
		const bearerToken = bearer[1];
		//Set the Token
		req.token = bearerToken;
		//Next middleware
		next();
	}else {
		//Forbidden
		res.sendStatus(403);
	}
}
//LocalHost Config
app.listen(5000, () => console.log('Server started on port 5000'));