const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// @route POST localhost:8000/api/register
// @desc route register 
// @access Public
exports.createRegister = async (req,res) =>{
    const { name,password} = req.body;
    try{
        // Check user already
        let user = await User.findOne({ name });
        if(user){
            return res.status(400)
            .json({msg:'User already exists'});
        }
        user = new User({
            name,
            password
        });

        // Encryt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        // payload return jsonwebtoken
        const payload = {
            user:{
                id: user.name,
                role: user.role
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn: 3600},(err,token)=>{
            if (err) throw err;
            res.json({token,payload});
        });
        

        // res.send('User Register Complete')
    }
    catch (err) {
        console.log(err.message);
        res.statue(500).send('Server Error');
    }
    
    
    // res.send('create Register new')
}
// @route POST localhost:8000/api/login
// @desc route login 
// @access Public
exports.login = async (req,res) =>{
    const { name,password} = req.body;
    try{
        // Check user already
        let user = await User.findOneAndUpdate({ name },{new: true});
        if(!user){
            return res.status(400)
            .json({msg:'username Invalid Credentials'});
        }

        // Compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400)
            .json({ msg : 'password Invalid Credentials'});
        }

        // payload return jsonwebtoken
        const payload = {
            user:{
                id: user._id,
                name: user.name,
                role: user.role
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn: 3600},(err,token)=>{
            if (err) throw err;
            res.json({token,payload});
        });
        

        // res.send('User Register Complete')
    }
    catch (err) {
        console.log(err.message);
        res.statue(500).send('Server Error');
    }
    // res.send('create Login new')
}

//@route POST localhost:8000/api/current-user
//@desc route current-user
//@access Private
exports.currentUser = async(req,res)=>{
    User.findOne({ name: req.user.name }).select('-password').exec((err,user)=>{
        if (err) throw new Error(err);
        res.json(user)
    })
}