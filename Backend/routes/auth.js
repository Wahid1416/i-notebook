const express = require("express");
const router = express.Router();
const UserSchema = require("../models/User");   // Your model
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const featchuser=require("../middlewire/fetchUser");
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: Create a User using: POST "/api/auth/createUser". No login required

router.post(
  "/createUser",
  [
    body("name", "Invalid Name").isLength({ min: 3 }),
    body("password", "Invalid Password").isLength({ min: 2 }),
    body("email", "Invalid Email").isEmail()
  ],
  async (req, res) => {
    // console.log("REQ BODY:", req.body);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      // Check whether the user with this email exists already
      let user = await UserSchema.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json( {error:"Sorry a user with this email already exists"} );
      }

      const salt = await bcrypt.genSalt(10);
      const SecuredPass = await bcrypt.hash(req.body.password, salt);
      user = await UserSchema.create({
        name: req.body.name,
        password: SecuredPass,
        email: req.body.email,
      });


      const data={
        user:{
          id:user.id
        }
      };

      var token = jwt.sign(data, JWT_SECRET);
      return res.status(201).json({token});
    } 
    catch (err) {
      console.error("Create user error:", err);
      return res.status(500).send( "Internal server error" );
    }
  }
);



// route-2 signin of user
router.post(
  "/signin",
  [
    body("password", "Invalid Password").isLength({ min: 2 }),
    body("email", "Invalid Email").isEmail()
  ],
  async (req, res) => {
     const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }


    const {email, password} = req.body;
    // console.log(req.body);

    try {
      let user=await UserSchema.findOne({ email : email });
      // console.log(user);
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }
      
      const passwordCompare= await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }

      const data={
        user:{
          id:user.id
        }
      };

      var token = jwt.sign(data, JWT_SECRET);
      return res.status(201).json({token:token});
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({error:"Internal server error"}); 
    }




  }
);


router.post(
  "/getUser",
  featchuser,
  async (req, res) => {

    const User_id=req.user.id;
    // console.log(User_id);

    try {
      let user=await UserSchema.findById(User_id).select("-password");
      // console.log(user);
      return res.status(201).send(user);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).send("Internal server error"); 
    }



  })

module.exports = router;
