const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e6c484508db04ac6843f76b58d4faf5a'
});

const handleApiCall = (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
          res.json(data);
      })
      .catch(err => res.status(400).json('enable to work with Api'))
}

const updateEntries = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entrie => {
        res.json(entrie[0]);
    }).catch(err => res.status(400).json("error in your entries"));
}

module.exports = {
    updateEntries,
    handleApiCall
}