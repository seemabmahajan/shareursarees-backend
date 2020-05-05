const db =  require('../models');

const show = (req, res) => {

    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.status(500).json ({
            status:500,
            message: err
        })

        // res.status(200).json({
        //     status: 200,
        //     data: foundUser
        //})
        res.json(foundUser)
        
    })
}


const updateProfile = (req,res) => {
    
    db.User.findByIdAndUpdate(req.params.id,req.body, {new : true},(err,updatedProfile)=> {
        if (err) return err
    
        res.json(updatedProfile)
    })
}


module.exports = {
    show,
    updateProfile
}