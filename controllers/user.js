const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const DummyVehicle = require('../models/DummyVehicle');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)
const { CLIENT_URL } = process.env;

exports.register = async(req, res, next) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({msg: "Please Fill all Fields"})
        }
        
        if(!validateEmail(email)){
            res.status(400).json({msg: "Invalid Email"})
        }
        
        // const user = User.findOne({email});
        // if(user){
        //     res.status(400).json({msg: "Email Already exist"})
        // } 

        if(password.length < 6){
            res.status(400).json({msg: "Password should be atlest 6 characters"})
        }

        const HashPassword = await bcrypt.hash(password, 12);

        const newUser = {
            name, email, password: HashPassword
        }
        
        const activationToken = createActivationToken(newUser);
        
        const url = `${CLIENT_URL}/user/activate/${activationToken}`
        sendMail(email, url, "Verify Your Email Address")

        res.json({msg: "Register Success! Please Activate your Account to start"})       
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.activateEmail = async(req, res, next) => {
    try {
        const {activationToken} = req.body;
        const user = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN);
        console.log(user);
        const {name, email, password} = user;
        const check = await User.findOne({email});
        if(check) return res.status(400).json({msg: "This Email Already exist"});
        const newUser = new User({
            name, email, password
        });
        await newUser.save();
        res.json({msg: "Account has been Activated"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({msg: "This Email does not exist"})
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect"})
        const refreshToken = createRefreshToken({id: user._id})
        console.log(refreshToken);
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/user/refreshToken',
            maxAge: 7*24*60*60*1000 //7 days 
        })
        res.json({msg: "Login Successfull!"})
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.getAccessToken = (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg: "Please Login Now"})
        jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
            if(err) return res.status(400).json({msg: "Please Login Now"})
            const access_token = createAccessToken({id: user.id});
            res.json({access_token})
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.forgotPassword = async(req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: "This Email does not exist"})
        const access_token = createAccessToken({id: user._id});
        const url = `${CLIENT_URL}/user/reset/${access_token}`;
        sendMail(email, url, "Reset Password");
        res.json({msg: "Please check your Email"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.resetPassword = async(req, res) => {
    try {
        const {password} = req.body;
        const passwordHash = await bcrypt.hash(password, 12);
        await User.findOneAndUpdate({_id: req.user.id}, {
            password: passwordHash
        })
        res.json({msg: "Password Reset"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.getUserInfo = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.getUsersAllinfo = async (req, res) => {
    try {
        const user = await User.find().select('-password');
        res.json(user)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/user/refreshToken'});
        res.json({msg: "Logout Successfully"});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.updateUser = async(req, res) => {
    try {
        const {name, avatar} = req.body;
        await User.findOneAndUpdate({_id: req.user.id}, {
            name, avatar
        })
        res.json({msg: "Updated"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.updateUsersRole = async(req, res) => {
    try {
        const { role } = req.body;
        await User.findOneAndUpdate({_id: req.params.id}, {
            role
        })
        res.json({msg: "Updated"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.addVehicle = async(req, res) => {
    const {number, name, model, bookFrontImage, bookBackImage, ownerName, ownerCNIC } = req.body;
    const newVehicle = new DummyVehicle({
        number, name, model, ownerName, ownerCNIC, bookFrontImage, bookBackImage
    })
    await newVehicle.save();
    res.json({msg: "Added"});
}

exports.viewVehicle = async(req, res) => {
    try {
        const vehicle = await DummyVehicle.find();
        res.json(vehicle)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.addVehicleDB = async(req, res) => {
    const vehicle = await DummyVehicle.findById(req.params.id);
    const {number, name, model, ownerName, ownerCNIC, bookFrontImage, bookBackImage} = vehicle;

    const newVehicle = new Vehicle({
        number, name, model, ownerName, ownerCNIC, bookFrontImage, bookBackImage
    })
    await newVehicle.save();

    await DummyVehicle.findByIdAndDelete(req.params.id);
    res.json({msg: "Your car has been Verified"});
}

exports.deleteVehicle = async = async(req, res) => {
    const vehicle = await DummyVehicle.findById(req.params.id);
    await DummyVehicle.findByIdAndDelete(req.params.id);
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({msg: "Your vehicles can't be Verified. Please contact to Admin"});
}

exports.googleLogin = async (req, res) => {
    try {
        const {tokenId} = req.body

        const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
        
        const {email_verified, email, name, picture} = verify.payload

        const password = email + process.env.GOOGLE_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

        const user = await User.findOne({email})

        if(user){
            // const isMatch = await bcrypt.compare(password, user.password)
            // if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refreshToken',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }else{
            const newUser = new User({
                name, email, password: passwordHash, avatar: picture
            })

            await newUser.save()
            
            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refreshToken',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, {expiresIn: "5m"})
  }
  const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "15m"})
  }
  const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "7d"})
  }