module.exports = function(app, streams) {
var mongojs = require('mongojs');
var db = mongojs('mongodb://albertan:sonata7@ds131511.mlab.com:31511/albertsdb',['tasks']);

  // GET home 
  var index = function(req, res) {

  var error;
  var dataman;
  db.tasks.find(function(err, tasks){
        if(err){
          error=err;
        }


        dataman= tasks;

        /*res.render('index', { 
                                title: 'Joongcam project', 
                                header: 'Joongcam',
                                username: 'Username',
                                share: 'Share this link',
                                footer: 'http://albertahn.com',
                                id: req.params.id,
                                datatask: dataman
                              });*/


    });

    
  };// index

  // GET streams as JSON
  var displayStreams = function(req, res) {
    var streamList = streams.getStreams();
    // JSON exploit to clone streamList.public
    var data = (JSON.parse(JSON.stringify(streamList))); 

    res.status(200).json(data);
  }; //display streams

var beforeLogin =  function(req, res) {

          res.render('login', { 
                                title: 'Login', 
                                header: 'Login',
                                username: 'Login',
                                share: 'Share this link',
                                footer: 'http://Login.com',
                                id: req.params.id
                              });

};

//set route
  app.get('/login', beforeLogin);
  app.get('/streams.json', displayStreams);
  app.get('/', index);
  app.get('/:id', index);
  
}