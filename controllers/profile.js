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

module.exports = {
    getProfile: getProfile
}