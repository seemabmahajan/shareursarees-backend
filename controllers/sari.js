const db =  require('../models')

const index = (req,res) => {
    db.Sari.find({}, (err, allSaris) =>{
        if(err) {
            return res.status(400).json({
                staus: 400,
                message: err
            })
        }
        res.json(allSaris)
    })
}


const createSari = (req,res) => {
    db.Sari.create(req.body,(err,newSari) => {
        if (err) {
            return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
          }
        db.User.findById(req.params.id,(err,foundUser)=>{
            if(err) {
                return res.status(400).json({status: 400, error: 'user not found!'})
            }
            foundUser.mySaris.push(newSari);

            foundUser.save(err,saveUser=>{
            if (err) {
                  return res.status(400).json({status: 400, error: 'Unable to save User.'});
                }

            return res.status(201).json({status: 201, message: " new sari saved!"})

            })
        })

 
      
    })
}

// const showUserSaris = (req, res) =>{
//     db.Sari.find({user : req.params.id}, (err,userSaris) =>{ 
//         if (err) {
//             return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//           }

//     res.json(userSaris)
 
//     })
// }

const showMySaris = (req,res) => {
    
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.status(500).json ({
            status:500,
            message: err
        })

        
        res.json(foundUser.mySaris)
        
    })
}



module.exports  = {
    index,
    createSari,
    showMySaris
}