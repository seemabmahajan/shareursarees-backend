const db =  require('../models')

// const index = (req,res) => {
//     db.Sari.find({}, (err, allSaris) =>{
//         if(err) {
//             return res.status(400).json({
//                 staus: 400,
//                 message: err
//             })
//         }
//         res.json(allSaris)
//     })
// }

const index = (req,res) => {
        db.Sari.find({ })
            .populate('user')
            .exec(  (err, allSaris) =>{
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

        
        res.json(foundUser)
        
    })
}


const deleteSari=(req,res)=>{
    
    
        db.User.findById(req.params.userId,(err,foundUser)=>{
        if (err) {
          return res.status(400).json({status: 400, error: 'user not found! :('});
        } 
    
        const removeSari=foundUser.mySaris.id(req.params.sariId);
    
        if(!removeSari){
            return res.status(400).json({status: 400, error: 'Could not find sari'});
        }
        removeSari.remove();
    
        foundUser.save((err,saveUser)=>{
            if(err){
                return res.status(400).json({status: 400, error: 'Your user was not saved'});
            }
    
            db.Sari.findByIdAndDelete(req.params.sariId,(err,deletedSari)=>{
                if(err){
                    return res.status(400).json({status: 400, error: 'Something went wrong, sari was not deleted'});
                }
    
                res.json(deletedSari);
    
            })
        })
    
        })
    }

        const updateSari=(req,res)=>{
            db.User.findById(req.params.userId,(err,foundUser)=>{
                if(err){
                   return res.status(400).json({status: 400, error: 'user not found!'}) 
                }
        
                let updatingSari=found.mySaris.id(req.params.sariId);
        
                if(!updatingSari){
                     return res.status(400).json({status: 400, message: "could not find sari"})
                }
        
                updatingSari.image=req.body.image;
                updatingSari.catagory=req.body.catagory;
                updatingSari.description=req.body.description;
        
                foundUser.save((err,saveUser)=>{
                    if(err){
                        return res.status(400).json({status: 400, error: 'user was not saved'});
                    }
        
                    db.Sari.findByIdAndUpdate(req.params.sariId,req.body,{new:true},(err,updateSari)=>{
                        if (err) {
                              return res.status(400).json({status: 400, error: 'final sari update was not possible.'});
                            }
                        res.json(updateSari);
                    })
                })
            })
        }
        
    
    

    




module.exports  = {
    index,
    createSari,
    showMySaris,
    deleteSari,
    updateSari,
}