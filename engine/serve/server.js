const express = require('express');
const app = express();

//test
//let projectLocation = process.cwd() + '\\akku\\';

//prod
let projectLocation = process.cwd() + '\\';

app.use(express.static(projectLocation));

app.get('/*', function(req, res){
  res.sendFile(projectLocation + 'index.html');
});

module.exports = {init:init};

function init(port){

  console.log('>>> starting server');

  app.listen(port.toString(),()=>{
    console.log('>>> vegana file server running on port 5566');
    console.log('>>> live on : http://localhost:5566');
  });

  return 'http://localhost:5566';

}
