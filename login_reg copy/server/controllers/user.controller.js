const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TestApi
module.exports.testApi = (req, res) => {
    res.json({Status: 'This is a test'})
}


// Register User
module.exports.register = (req, res) => {
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({id: user._id}, process.env.FIRST_SECRET_KEY);
        res
            .cookie("usertoken", userToken, {httpOnly: true})
            .json({ msg: "success!", user: user });
    })
    .catch(err => {res.status(400).json(err)});
}



// LoginUser
module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.loginEmail });

    // Check if email exists in the database, if not, return an error
    if(user === null) {
        return res.sendStatus("No email matches", 400);
    }

    // Compare the supplied password to the hashed password in the database. If passwords don't
    // match,return an error
    const correctPassword = await bcrypt.compare(req.body.loginPassword, user.password);
    if(!correctPassword) {
        return res.sendStatus("Password doesn't match", 400);
    }


    
    const userToken = jwt.sign({id: user._id}, process.env.FIRST_SECRET_KEY);
    // note that the response object allows chained calls to cookie and json
    res.cookie("usertoken", userToken, {httpOnly: true}).json({ msg: "success!" });
}



// Logout User
module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

// Get All Users
module.exports.getAllUsers = (req, res) => {
    User.find()
        .then((Users) => {
            res.json(Users);
        })
        .catch((err) => {res.status(400).json({err});
    });
};

// Get One (Current) User
module.exports.getUser = (req, res) =>{
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete: true})
    User.findOne({_id: decodedJwt.payload.id})
        .then(oneUser=>res.json(oneUser))
        .catch(err=>res.status(500).json(err))
}

// Delete User
module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then((deletedUser) => {
            res.json({ deletedUser });
        })
        .catch((err) => {res.json(400).json({err});
    });
};










