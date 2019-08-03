const Exercise = require('../models/exercise');
const User = require('../models/user');

//I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
exports.postAddUser = (req, res, next) => {
    const username = req.body.username;
    let user = new User({username})
    user.save( (err,user) => {
        if (err) {
            res.send(err);
        } else {
            console.log(user);
            res.send(user);
        }
    });
};

//I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. 
//If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
exports.postAddExercise = (req, res, next) => {
    const user_id = req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date ? new Date(req.body.date) : Date.now();
    User.findOne({_id:user_id},(err, user) => {
        if (err) {
          res.send('User not found')
        } else {
            let exercise = new Exercise({user_id, description, duration, date});
            exercise.save((err, exs) => {
                if (err) {
                    res.send(err);
                } else {
                    console.log(exs);
                    res.send({"userId": user_id, "username": user_id.username, "description": exs.description, "duration": exs.duration, "date": exs.date});
                }
              })
        }
    });
    
};

//I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
exports.getUsers = (req, res, next) => {
    User.find({}, function (err, users) {
        res.send(users);
    });
  };

//I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). 
//Return will be the user object with added array log and count (total exercise count).
//I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
exports.getLogs = (req, res, next) => {
  
  let params = {}
  params.user_id = req.query.userId;
  
  let limit = req.query.limit ? parseInt(req.query.limit) : 0;
  if(req.query.from || req.query.to){
    params.date={}
    if(req.query.from){
        params.date.$gte = new Date(req.query.from);
    }
    if(req.query.to){
        params.date.$lte = new Date(req.query.to);
    }
  }
  

  User.findOne({_id:params.user_id},(err, user) => {
    if (err) {
      res.send('User not found')
    } else {
        Exercise.find(params).limit(limit).then(items => {
            return res.send({username: user.username, _id: user._id, count: items.length, log: items}) 
        });
    }
  });
  
};

