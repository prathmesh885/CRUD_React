const User = require("../services/service");

exports.findAll = (req, res) => {
  User.find()
  .then(data => {
    res.send(data)
  }).catch(error => {
    res.send(error)
  })
}

exports.create = (req, res) => {
  const user = new User({
    firsName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  })

  user.save()
    .then(data => {
      res.send(data)
    }).catch(error => {
      res.send(error)
    })
}

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(data => {
    if(!data) {
        return res.status(404).send({
            message: "data not found with id " + req.params.id
        });
    }
    res.send({message: "data deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "data not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Could not delete data with id " + req.params.id
    });
  });
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    firsName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  }, {new: true})
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.send(err)
  })
}