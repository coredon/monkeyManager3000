const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');
const path = require('path');


// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))
app.set('view engine','pug')
app.set('views', path.join(__dirname,'/views'))


app.get('/', function (req, res) {
  res.render('index', { title: 'Monkey Manager', message: 'Hello there!'});
});


//api rest
app.post('/ajouter_singe',function (req,res) {
  models.singes.create({
    name: req.body.name,
    race: req.body.race,
    sexe: req.body.sexe,
    age: req.body.age
  })
    .then(() => {
      res.send('yasuo added')
    })
})
app.post('/ajouter_enclos',function (req,res) {
  models.enclos.create({
    nom: req.body.nom,

  })
    .then(() => {
      res.send('faille de l\'invocateur added')
    })
})
//web
app.post('/ajoutersinge',function (req,res) {
  models.singes.create({
    name: req.body.name,
    race: req.body.race,
    sexe: req.body.sexe,
    age: req.body.age
  })
    .then(() => {
      res.render('ajoutersinge',{ title: 'ajout d\'un singe'})
    })
})
app.post('/ajouterenclos',function (req,res) {
  models.enclos.create({
    nom: req.body.nom,

  })
    .then(() => {
      res.render('ajouterenclos',{ title: 'ajout d\'une faille de l\'invocateur'})
    })
})


// api rest
app.delete('/delete_singe', function(req, res) {
  models.singes.destroy({where:{id : req.body.id}})
  .then(() => {
      res.send('yasuo deleted !')
    })
})

app.delete('/delete_enclos', function(req, res) {
  models.enclos.destroy({where:{id : req.body.id}})
  .then(() => {
      res.send('faille de l\'invocateur deleted !')
    })
})

// site web
app.post('/deletesinge', function(req, res) {
  models.singes.destroy({where:{id : req.body.id}})
  .then(() => {
      res.render('deletesinge',{ title: 'suppression d\'un yasuo'})
    })
})

app.post('/deleteenclos', function(req, res) {
  models.enclos.destroy({where:{id : req.body.id}})
  .then(() => {
      res.render('deleteenclos',{ title: 'suppression d\'une faille de l\'invocateur'})
    })
})
//api rest
app.delete('/plusieurs_singes', function(req, res) {
  var words = req.body.deleted.split(',');
      models.singes.destroy({where:{id : [words]}})
  .then(() => {
      res.send('yasuo deleted !')
    })
})
app.delete('/plusieurs_enclos', function(req, res) {
  var words = req.body.deleted.split(',');
      models.enclos.destroy({where:{id : [words]}})
  .then(() => {
      res.send('faille de l\'invocateur deleted !')
    })
})



//api rest
app.put('/modif_singe',function(req,res){
  var voulu= req.body.voulu
  switch (voulu){
  case 'name':
    models.singes.update({name : req.body.pasb}, {where:{ oid : req.body.ident}})
    .then(()=>{res.send('changement effectué')})
    break;
  case 'race':
    models.singes.update({race : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.send('changement effectué')})
    break;
  case 'sexe':
    models.singes.update({sexe : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.send('changement effectué')})
    break;
  case 'enclos':
    models.singes.update({enclos : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.send('changement effectué')})
    break;
  case 'age':
    models.singes.update({age : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.send('changement effectué')})
    break;
                }
})
app.put('/modif_enclos',function(req,res){
    models.enclos.update({nom : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.send('changement effectué')})
})

//web 

app.post('/modifsinge',function(req,res){
  var voulu= req.body.voulu
  switch (voulu){
  case 'name':
    models.singes.update({name : req.body.pasbo}, {where:{ id : req.body.ident}})
    .then(()=>{res.render('modifsinge',{ title: 'moddification d\'un yasuo'})})
    break;
  case 'race':
    models.singes.update({race : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.render('modifsinge',{ title: 'moddification d\'un yasuo'})})
    break;
  case 'sexe':
    models.singes.update({sexe : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.render('modifsinge',{ title: 'moddification d\'un yasuo'})})
    break;
  case 'enclos':
    models.singes.update({enclos : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.render('modifsinge',{ title: 'moddification d\'un yasuo'})})
    break;
  case 'age':
    models.singes.update({age : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.render('modifsinge',{ title: 'moddification d\'un yasuo'})})
    break;
                }
})
app.post('/modifenclos',function(req,res){
    models.enclos.update({nom : req.body.pasbo}, {where:{id : req.body.ident}})
    .then(()=>{res.render('modifenclos',{ title: 'moddification d\'une faille de l\'invocateur'})})
})


//api rest

app.put('/modif_plusieur_singes',function(req,res){
  var words = req.body.achange.split(',');
  var words2 = req.body.modification.split(',');
  var words3 = req.body.voulu.split(',');
  const promises = [];
  for(var i=0;i<words.length;i++){
    var voulu = words3[i];
    switch (voulu){
        case 'name':
          promises.push(models.singes.update({name : words[i]}, {where:{id : words2[i]}}))
          break;
        case 'race':
          promises.push(models.singes.update({race : words[i]}, {where:{id : words2[i]}}))
          break;           
        case 'sexe':
          promises.push(models.singes.update({sexe : words[i]}, {where:{id : words2[i]}}))
          break;
        case 'enclos':
          promises.push(models.singes.update({enclos : words[i]}, {where:{id : words2[i]}}))
          break;
        case 'age':
          promises.push(models.singes.update({age : words[i]}, {where:{id : words2[i]}}))
          break;
                  }
  }
  Promise.all(promises)
    .then(() => {
      res.send('voilà.')
    })
})
app.put('/modif_plusieur_enclos',function(req,res){
  var words = req.body.achange.split(',');
  var words2 = req.body.modification.split(',');
  const promises = [];
  for(var i=0;i<words.length;i++){
   promises.push(models.enclos.update({nom : words[i]}, {where:{id : words2[i]}}))
  }

  Promise.all(promises)
    .then(() => {
      res.send('voilà.')
    })
})



//api rest

// Get all the users defined
app.get('/singe', function (req, res) {
  models.singes.findAll()
    .then((singes) => {
      res.json(singes)
    })
})
app.get('/enclos', function (req, res) {
  models.enclos.findAll()
    .then((enclos) => {
      res.json(enclos)
    })
})
//web non focntionnel
app.get('/listesinge', function (req, res) {
  models.singes.findAll()
    .then((singes) => {
      res.render( 'listesinge', { title : 'liste singe',message : "singes", singes : singes })
    })
})
app.get('/listeenclos', function (req, res) {
  models.enclos.findAll()
    .then((enclos) => {
      res.render( 'listeenclos', { title : 'liste enclos',message : "enclos", enclos : enclos })
    })
})




// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   *
   * Listen only when database connection is sucessfull
   */
  app.listen(process.env.PORT, function() {
    console.log('Express server listening on port' + process.env.PORT);
  });
});
