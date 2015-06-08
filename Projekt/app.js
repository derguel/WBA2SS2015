var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var db = redis.createClient();
var app = express();
app.use(bodyParser.json());



/*Team*/

//POST Team
app.post('/team', function(req, res) {
  var newTeam = req.body;

  db.incr('id:team', function(err, rep) {
    newTeam.id = rep;

    db.set('teamID: ' + newTeam.id, JSON.stringify(newTeam), function(err, rep) {
      res.json(newTeam);
    });
  });
});

//GET Team
app.get('/team/:id', function(req, res) {
  db.get('teamID: ' + req.params.id, function(err, rep) {
    if(rep) {
      res.type('json').send(rep);
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.id + ' existiert nicht.');
    }
  });
});

//PUT Team
app.put('/team/:id', function(req, res) {
  db.exists('teamID: ' + req.params.id, function(err, rep) {
    if(rep == 1) {
      var updTeam = req.body;
      updTeam.id = req.params.id;
      db.set('teamID: ' + req.params.id, JSON.stringify(updTeam), function(err, rep){
        res.json(updTeam);
      });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.id + ' existiert nicht');
    }
  });
});

//DELETE Team
app.delete('/team/:id', function(req, res) {
  db.del('teamID: ' + req.params.id, function(err, rep) {
    if(rep) {
      res.status(200).type('text').send('OK');
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.id + ' existiert nicht.');
    }
  });
});

//Alle Teams ausgeben
app.get('/team', function(req, res) {
  db.keys('teamID:*', function(err, rep) {

    var teams = [];

    if(rep.length == 0) {
      rep.json(teams);
    }

    db.mget(rep, function(err, rep) {

      rep.forEach(function(val) {
        teams.push(JSON.parse(val));
      });

      res.json(teams);
    });
  });
});



/*Trainer*/

//POST Trainer
app.post('/trainer', function(req, res) {
  var newTrainer = req.body;

  db.incr('id:trainer', function(err, rep) {
    newTrainer.id = rep;

    db.set('trainerID: ' + newTrainer.id, JSON.stringify(newTrainer), function(err, rep) {
      res.json(newTrainer);
    });
  });
});

//GET Trainer
app.get('/trainer/:id', function(req, res) {
  db.get('trainerID: ' + req.params.id, function(err, rep) {
    if(rep) {
      res.type('json').send(rep);
    }
    else {
      res.status(404).type('text').send('Der Trainer mit der ID: ' + req.params.id + ' existiert nicht.');
    }
  });
});

//PUT Trainer
app.put('/trainer/:id', function(req, res) {
  db.exists('trainerID: ' + req.params.id, function(err, rep) {
    if (rep == 1) {
      var updTrainer = req.body;
      updTrainer.id = req.params.id;
      db.set('trainerID: ' + req.params.id, JSON.stringify(updTrainer), function(err, rep) {
        res.json(updTrainer);
      });
    }
    else {
      res.status(404).type('text').send('Der User mit der ID: ' + req.params.id + ' existiert nicht.');
    }
  });
});

//DELETE Trainer
app.delete('/trainer/:id', function(req, res) {
  db.del('trainerID: ' + req.params.id, function(err, rep) {
    if(rep == 1){
      res.status(200).type('text').send('OK');
    }
    else {
      res.status(404).type('text').send('Der Trainer mit der ID: ' + req.params.id + ' existiert nicht.');
    }
  });
});

//Alle Trainer ausgeben
app.get('/trainer', function(req, res) {
  db.keys('trainerID:*', function(err, rep) {

    var trainer = [];

    if(rep.length == 0) {
      res.json(trainer);
      return;
    }
    
    db.mget(rep, function(err, rep) {

      rep.forEach(function(val){
        trainer.push(JSON.parse(val));
      });

      trainer = trainer.map(function(trainer) {
        return {name: trainer.name};
      })

      res.json(trainer);
    });
  });
});



/*Spieler*/

//POST Spieler
app.post('/team/:team/spieler', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {
    var newSpieler = req.body;

    db.incr('id:spieler', function(err, rep) {
      newSpieler.id = rep;

      db.set('spielerID: ' + req.params.team + '_' + newSpieler.id, JSON.stringify(newSpieler), function(err, rep) {
        res.json(newSpieler);
        });
      }); 
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });  
});

//GET Spieler
app.get('/team/:team/spieler/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {
      db.get('spielerID: ' + req.params.team + '_' + newSpieler.id, function(err, rep) {
        if(rep) {
          res.type('json').send(rep);
        }
         else {
          res.status(404).type('text').send('Der Spieler mit der ID: ' + req.params.id + ' existiert nicht.');
    }
  });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
});
});

//PUT Spieler
app.put('/team/:team/spieler/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {
      db.exists('spielerID: ' + req.params.team + '_' + newSpieler.id, function(err, rep) {
        if (rep == 1) {
          var updSpieler = req.body;
          updSpieler.id = req.params.id;
            db.set('spielerID: ' + req.params.team + '_' + newSpieler.id, JSON.stringify(updSpieler), function(err, rep) {
            res.json(updSpieler);
           });
        }
        else {
           res.status(404).type('text').send('Der Spieler mit der ID: ' + req.params.id + ' existiert nicht.');
        }
       });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });           
});

//DELETE Spieler
app.delete('/team/:team/spieler/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {     
      db.del('spielerID: ' + req.params.team + '_' + newSpieler.id, function(err, rep) {
       if(rep == 1){
         res.status(200).type('text').send('OK');
        }
        else {
          res.status(404).type('text').send('Der Spieler mit der ID: ' + req.params.id + ' existiert nicht.');
        }
     });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});

//Alle Spieler ausgeben
app.get('/team/:team/spieler', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {   
      db.keys('spielerID:*', function(err, rep) { //id-team tauschen

        var spieler = [];

        if(rep.length == 0) {
          res.json(spieler);
          return;
        }

       db.mget(rep, function(err, rep) {

         rep.forEach(function(val){
            spieler.push(JSON.parse(val));
          });

          spieler = spieler.map(function(spieler) {
            return {name: spieler.name};
          })

          res.json(spieler);
        });
      });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});



/*Spielplan*/

//POST Spielplan
app.post('/team/:team/spielplan', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {   
     var newSplan = req.body;

      db.incr('id:spielplan', function(err, rep) {
       newSplan.id = rep;

       db.set('spielplanID: ' + newSplan.id, JSON.stringify(newSplan), function(err, rep) {
          res.json(newSplan);
        });
     });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});

//GET Spielplan
app.get('/team/:team/spielplan/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {   
     db.get('spielplanID: ' + req.params.id, function(err, rep) {
        if(rep) {
          res.type('json').send(rep);
       }
       else {
        res.status(404).type('text').send('Der Spielplan mit der ID: ' + req.params.id + ' existiert nicht.');
       }
     });
   }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});

//PUT Spielplan
app.put('/team/:team/spielplan/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {        
     db.exists('spielplanID: ' + req.params.id, function(err, rep) {
       if (rep == 1) {
          var updSplan = req.body;
         updSplan.id = req.params.id;
         db.set('spielplanID: ' + req.params.id, JSON.stringify(updSplan), function(err, rep) {
           res.json(updSplan);
         });
       }
       else {
         res.status(404).type('text').send('Der Spielplan mit der ID: ' + req.params.id + ' existiert nicht.');
       }
     });
   }
   else {
    res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
   }
 });
});

//DELETE Spielplan
app.delete('/team/:team/spielplan/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {        
     db.del('spielplanID: ' + req.params.id, function(err, rep) {
       if(rep == 1){
        res.status(200).type('text').send('OK');
       }
       else {
         res.status(404).type('text').send('Der Spielplan mit der ID: ' + req.params.id + ' existiert nicht.');
       }
      });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});

//Alle Spielpläne ausgeben
app.get('/team/:team/spielplan', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {         
      db.keys('spielplanID:*', function(err, rep) {

       var splan = [];

       if(rep.length == 0) {
         res.json(splan);
         return;
        }

       db.mget(rep, function(err, rep) {

          rep.forEach(function(val){
            splan.push(JSON.parse(val));
          });

         splan = splan.map(function(splan) {
           return {name: splan.name};
          })

         res.json(splan);
        });
     });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});



/*Trainingsplan*/

//POST Trainingsplan
app.post('/team/:team/trainingsplan', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {      
     var newTplan = req.body;
     var array = [];
  
      db.keys('spielerID: ' + req.params.team + '*', function(err, rep) {
    
        db.mget(rep, function(err, rep) {
    
         rep.forEach(function(val) {
           array.push(JSON.parse(val));
         });

         array = array.map(function(array) {
            return {name: array.name, id: array.id, angemeldet: 1};
         })

    
          db.incr('id:trainingsplan', function(err, rep) {
            newTplan.id = rep;
           newTplan.spieler = array;

              db.set('trainingsplanID: ' + newTplan.id, JSON.stringify(newTplan), function(err, rep) {
                res.json(newTplan);
           });
          });
       });
      });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});

//GET Trainingsplan
app.get('/team/:team/trainingsplan/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {       
     db.get('trainingsplanID: ' + req.params.id, function(err, rep) {
      if(rep) {
         res.type('json').send(rep);
        }
       else {
         res.status(404).type('text').send('Der Trainingsplan mit der ID: ' + req.params.id + ' existiert nicht.');
       }
     });
   }
   else {
    res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
   }
 });
});

//PUT Trainingsplan
app.put('/team/:team/trainingsplan/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {    
      db.get('trainingsplanID: ' + req.params.id, function(err, rep) { //exists - get in einem zusammenfassen
        if (rep) {
      
 
        var array = [];
        rep = JSON.parse(rep); //Variable ändern
        array = rep.spieler;



        var updTplan = req.body;
        updTplan.id = req.params.id;
        updTplan.spieler = array;
        console.log("spieler " + updTplan.spieler);

        db.set('trainingsplanID: ' + req.params.id, JSON.stringify(updTplan), function(err, rep) {
            res.json(updTplan);
          });
      }
       else {
          res.status(404).type('text').send('Der Trainingsplan mit der ID: ' + req.params.id + ' existiert nicht.');
       }
      });
   }
   else {
    res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
   }
 });
});

//DELETE Trainingsplan
app.delete('/team/:team/trainingsplan/:id', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {       
      db.del('trainingsplanID: ' + req.params.id, function(err, rep) {
       if(rep == 1){
         res.status(200).type('text').send('OK');
       }
       else {
         res.status(404).type('text').send('Der Trainingsplan mit der ID: ' + req.params.id + ' existiert nicht.');
        }
      });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });
});

//Alle Trainingspläne ausgeben
app.get('/team/:team/trainingsplan', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) {    
     db.keys('trainingsplanID:*', function(err, rep) {

        var tplan = [];

       if(rep.length == 0) {
         res.json(tplan);
         return;
       }

        db.mget(rep, function(err, rep) {

         rep.forEach(function(val){
           tplan.push(JSON.parse(val));
         });

         res.json(tplan);
        });
      });
   }
   else {
    res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
   }
 });
});

//Abmeldung
app.put('/team/:team/trainingsplan/:id/:spieler', function(req, res) {
  db.get('teamID: ' + req.params.team, function(err, rep) {
    if(rep) { 
      db.get('trainingsplanID: ' + req.params.id, function(err, rep) {
        if(rep) {
          var tPlan = JSON.parse(rep);
          var tPlanArr = tPlan.spieler;
          var array = [];

          tPlanArr.forEach(function(val){
            array.push(val);
          });

          console.log("Array: " + array);
          
          array.forEach(function(val, index) {
           
            if(val.id == req.params.spieler) {
              array[index] = req.body;
              tPlan.spieler = array;
              db.set('trainingsplanID: ' + req.params.id, JSON.stringify(tPlan), function(err, rep) {
                res.json(tPlan);
              });
            }
          });
        }
        else {
          res.status(404).type('text').send('Der Trainingsplan mit der ID: ' + req.params.id + ' existiert nicht.');
        }
      });
    }
    else {
      res.status(404).type('text').send('Das Team mit der ID: ' + req.params.team + 'existiert nicht.');
    }
  });  
});


app.listen(3000);
