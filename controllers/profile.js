const getProfile = (req, res, db) => {
    const { id } = req.params;
    
    db('users').select('*').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else {
            res.status(400).json("the user not founs");
        }
    }).catch(err => res.status(400).json("there is an error in your profile"));
}

const handleProfileUpdate = (req, res, db) => {
    const {id} = req.params;
    const { name, age, pet } = req.body.formInput
    db('users')
     .where({ id })
     .update({ name })
     .then(resp => {
         if(resp){
             res.json("Success")
         }else {
             res.status(400).json("unable to update")
         }
     })
     .catch(err => res.status(400).json("error updating user"))
}

module.exports = {
    getProfile,
    handleProfileUpdate
}