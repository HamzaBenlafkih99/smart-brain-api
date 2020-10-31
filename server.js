const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const bodyParser  =require('body-parser');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smart_brain'
    }
});

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.status(200).json({users: database.users}) });
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/user/:id', (req, res) => { profile.getProfile(req, res, db) });
app.post('/user/:id', (req, res) => { profile.handleProfileUpdate(req, res, db) });
app.put('/image', (req, res) => { image.updateEntries(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3000, ()=> {
    console.log('the server running on the port 3000');
});

