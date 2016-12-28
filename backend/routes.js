var Litter = require('./models/litter');

// add get & post requests

// get - load page, load map, populate litter, load selected litter

// post - add litter to db

// get '/' return PresentationScreen


module.exports = function(app) {

  app.get('/api/litter', function(req, res) {
    Litter.find(function(err, litter) {
      if (err) { res.send(err); }
      res.json(litter);
    })
  });

  app.post('/api/litter', function(req, res) {
    Litter.create({
      text: req.body.text,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }, function(err, litter) {
      if (err) { res.send(err); }
      Litter.find(function(err, litter) {
        if (err) { res.send(err); }
        res.json(litter);
      });
    });
  });

  app.delete('/api/litter/:litter_id', function(req, res) {
    Litter.remove({
      _id: req.params.litter_id
    }, function(err, litter) {
      if (err) { res.send(err); }
      Litter.find(function(err, litter) {
        if (err) { res.send(err); }
        res.json(litter);
      });
    });
  });
  
}
