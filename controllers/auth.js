const db = require('../models')
const bcrypt = require('bcrypt')

const register = (req, res) => {
    
    if(!req.body.email || ! req.body.password) {
        return res.status(400).json({
            status : 400,
            message : 'Please enter an email and password'
        })
    }

    db.User.findOne({ email : req.body.email },(err,foundUser)=>{


        if(err) return res.status(500).json({
            status:500,
            message: `There is error here ${err}` 
        })
            
        

        if(foundUser) return res.status(400).json({
            status : 400,
            message : ' A user with that email already exists. Please try with new one '
        })

        bcrypt.genSalt(10,(err,salt) => {
            if(err) return res.status(500).json({
                status : 500, 
                message : `Something went wrong. Please try again, ${err}`
            })

            bcrypt.hash(req.body.password,salt, (err,hash) => {
                if(err) return res.status(500).json({
                    status : 500,
                    message : `Something went wrong.  ${err}`
                })

                const newUser = {
                name : req.body.name,
                email: req.body.email,
                password : hash,
                phone: req.body.phone
                
                }

                db.User.create(newUser, (err, savedUser)=> {
                 if(err)  return res.status(500).json({status:500, message : `There is a problem with creatin user ${err}`})
                 
                 return res.status(200).json({ status: 200, message: "User registered!" })
                        
                })

            })
        })
    })
}

const login = (req ,res ) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({status : 400, message : 'Please enter your email and password'})
    }

    db.User.findOne({email:req.body.email}, (err,foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });

        if(!foundUser) {
            if (err) return res.status(400).json({ status: 400, message: 'Email or password is incorret' });
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: 'Try with another password' });

            if(isMatch) {
                req.session.currentUser = {id : foundUser._id}
                return res.status(200).json({status: 200, message : "Succes", data : foundUser._id})
            } else {
                return res.status(400).json({ status: 400, message: 'Email or password is incorret' });
            }
        })
    })
}   


const logout = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({status :401, message : 'Unauthorized'})

    req.session.destroy((err)=> {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });
        res.sendStatus(200)
    })
}


const verify = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({status : 401, message: 'Unauthorized'})
    res.status(200).json({
        status : 200,
        message : `Current user verified. User ID : ${req.session.currentUser.id}`,
        currentUser : req.session.currentUser
    })
}

module.exports  = {
    register,
    login,
    verify,
    logout
}