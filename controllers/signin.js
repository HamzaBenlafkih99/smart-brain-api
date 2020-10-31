const jwt = require('jsonwebtoken');

const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password){
        return Promise.reject('incorrect form submition')
    }
    return db.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
          const isValid = bcrypt.compareSync(password, data[0].hash);
          if(isValid){
              return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => user[0])
                .catch(err => Promise.reject('unabled get user'))
          }else {
              Promise.reject('wrong credentials');
          }
      })
      .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
    console.log("token");
}

const signToken = email => {
    const jwtPyload = {email};
    return jwt.sign(jwtPyload, 'HAMZASECRET_1999', {expiresIn: '2 days'})
}

const createSession = user => {
    const {email, id} = user;
    const token = signToken(email);
    return { sucess: 'true', userId: id, token }
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const {authorization} = req.headers;

    return authorization ? getAuthTokenId() : 
      handleSignin(req, res, db, bcrypt)
       .then(data => {
           return data.id && data.email ? createSession(data): Promise.reject(data);
       })
       .then(session => res.json(session))
       .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication
}