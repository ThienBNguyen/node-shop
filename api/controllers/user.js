const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation, loginSchema} = require('../middleware/validation')
const User = require('../models/user');

exports.user_signup = async (req, res, next) => {
  const {error} = registerValidation(req.body)

  if(error) return res.status(400).send(err.details[0].message)

  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists')

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)


  const user = new User({
               _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hashPassword,
    
  });
  try{
const savedUser = await user.save()
     res.status(201).json({
              message: 'User created',
            })
      return res.send(savedUser)
  }catch(err){
    res.status(400).send(err)
  }
  // User.find({ email: req.body.email })
  //   .exec()
  //   .then((user) => {
  //     if (user && user.length >= 1) {
  //       return res.status(409).json({
  //         message: 'Mail exists',
  //       });
  //     } else {
  //       bcrypt.hash(req.body.password, 10, (err, hash) => {
  //         if (err) {
  //           return res.status(500).json({
  //             error: err,
  //           });
  //         } else {
  //           const user = new User({
  //             _id: new mongoose.Types.ObjectId(),
  //             firstname: req.body.firstname,
  //             lastname: req.body.lastname,
  //             email: req.body.email,
  //             password: hash,
  //           });
  //           user
  //             .save()
  //             .then((result) => {
  //               console.log(result);
  //               res.status(201).json({
  //                 message: 'User created',
  //               });
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //               res.status(500).json({
  //                 error: err,
  //               });
  //             });
  //         }
  //       });
  //     }
  //   });
};

exports.user_login = async (req, res, next) => {

  // const userexmist = await User.findOne({email: req.body.email});
  // if(!userexmist) return res.status(400).send('Email or password does not  exists')

const {error} = loginValidation(req.body);
//ket validate  the data before a user
if(error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({email: req.body.email});

  if(!user) return res.status(400).send('Email is not found')

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password')

const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
// res.header('auth-token', token).send(token)
res.header('auth-token', token).status(200).json({
            message: 'Auth successful',
            token: token,
          });

  // res.send('auth complete')




  // User.find({ email: req.body.email })
  //   .exec()
  //   .then((user) => {
  //     if (user.length < 1) {
  //       return res.status(401).json({
  //         message: 'Auth failed',
  //       });
  //     }
  //     bcrypt.compare(req.body.password, user[0].password, (err, result) => {
  //       if (err) {
  //         return res.status(401).json({
  //           message: 'Auth failed',
  //         });
  //       }
  //       if (result) {
  //         const token = jwt.sign(
  //           {
  //             email: user[0].email,
  //             userId: user[0]._id,
  //           },
  //           process.env.JWT_KEY,
  //           {
  //             expiresIn: '1h',
  //           }
  //         );
  //         return res.status(200).json({
  //           message: 'Auth successful',
  //           token: token,
  //         });
  //       }
  //       res.status(401).json({
  //         message: 'Auth failed',
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
