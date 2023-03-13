const express = require('express');
var bodyParser = require('body-parser')
const connected= require('../backend/connect/connect.js')
const usermodel=require("../backend/model/user.js")
const {problemmodel,favmodel}=require('../backend/model/problem.js')
const Solvedmmodel = require('./model/solved.js');
const cors = require("cors");
const contestmodel = require('./model/contest.js');

connected()
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.route('/home').post((req,res)=>
{
    let user= new usermodel(req.body)
    console.log(user.username)
    user.save((err,contact)=>
    {
        if(err)
          res.send(err);
        // res.json(contact)
    });
	let solved= new Solvedmmodel(req.body)
    solved.save((err,pro)=>
    {
		if(err)
          res.send(err);
        res.json(pro)
    });
    
});


app.route("/user").get((req, res) => {
    // console.log("called")
	usermodel.find({}, (err, user) => {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

app.route("/account").put((req, res) => {
	usermodel.findOneAndUpdate(
		{ _id: req.body[0]._id },
		req.body[0],
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				res.send(err);
			}
			res.json(user);
		}
	);
});
app.route('/favorite/:name').post((req,res)=>
{
    let fav= new favmodel(req.body)
    fav.save((err,pro)=>
    {
		if(err)
          res.send(err);
		usermodel.find({username:req.params.name}, (err, user) => {
			if (err) {
				res.send(err);
				}
			user[0].Favorite.push(pro._id)
			usermodel.findOneAndUpdate(
				{ username: req.params.name },
				user[0],
				{ new: true, useFindAndModify: false },
				(err, user) => {
					if (err) {
						res.send(err);
					}
					res.json(user);
				}
			);
		});
    });


    
});
app.route("/problem").get((req, res) => {
    // console.log("called")
	problemmodel.find({}, (err, user) => {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

app.route('/addproblem').post((req,res)=>
{
	// console.log(req.body)
    let problem= new problemmodel(req.body)
	console.log(problem)
    problem.save((err,pro)=>
    {
		if(err)
          res.send(err);
        console.log(pro)
    });
    
});
app.route('/solved').post((req,res)=>
{
	// console.log(req.body)
    let problem= new Solvedmmodel(req.body)
	console.log(problem)
    problem.save((err,pro)=>
    {
		if(err)
          res.send(err);
        console.log(pro)
    });
    
});
app.route('/userproblem/:username').get((req,res)=>
{
	// console.log(req.params.username)
	Solvedmmodel.find({username:req.params.username}, (err, user) => {
		if (err) {
			res.send(err);
			}
		res.json(user)		
	});
    
});
app.route('/userproblem1/:username').get((req,res)=>
{
	// console.log(req.params.username)
	Solvedmmodel.find({username:req.params.username}, (err, user) => {
		if (err) {
			res.send(err);
			}
		res.json(user)		
	}).populate( {path: 'solved.problem'});
    
});
app.route('/user/:username').get((req,res)=>
{
	// console.log("called")
	usermodel.find({username:req.params.username}, (err, user) => {
		if (err) {
			res.send(err);
			}
		res.json(user)
	});
    
});
app.route('/userproblem/:username').put((req, res) => {
    // console.log(req.body[0])
	Solvedmmodel.findOneAndUpdate(
		{ _id: req.body[0]._id },
		req.body[0],
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				res.send(err);
			}
			res.json(user);
		}
	);
})
app.route('/problem/:name').get((req,res)=>
{
	// console.log(req.params.name)
	problemmodel.find({problems:req.params.name}, (err, user) => {
		if (err) {
			res.send(err);
			}
		res.json(user)	
	});
    
});
app.route('/favorite/:id').put((req,res)=>
{
	// console.log(req.body)
	favmodel.findOneAndUpdate(
		{ _id: req.params.id},
		req.body,
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				res.send(err);
			}
			console.log(user)
		}
	);
    
});

app.route('/favorite/:name').get((req,res)=>{
	usermodel.find({username:req.params.name},(err, user) => {
		if (err) {
			res.send(err);
			console.log(err)
			}
			res.json(user)
	}).populate(   {path: 'Favorite',
    populate: { path: 'problems' }})
})
app.route('/problem/:name').put((req, res) => {
	problemmodel.findOneAndUpdate(
		{ _id: req.body[0]._id },
		req.body[0],
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				res.send(err);
			}
			res.json(user);
		}
	);
})
app.route('/contest').put((req, res) => {
	console.log(req.body)
	contestmodel.findOneAndUpdate(
		{ _id: req.body._id },
		req.body,
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				res.send(err);
			}
			console.log(user)
		}
	);
})


app.route('/contest').get((req,res)=>
{
	// console.log(req.params.name)
	contestmodel.find({}, (err, user) => {
		if (err) {
			res.send(err);
			}
		res.json(user)	
	});
    
});

app.listen(5000,()=>
{
    console.log("serve is started at 5000")
})