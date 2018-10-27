const express = require('express');
const app = express();

//test
//let projectLocation = process.cwd() + '\\akku\\';

//prod
let projectLocation = process.cwd() + '\\';

app.use(express.static(projectLocation));

module.exports = {init:init};

function init(){

  console.log('>>> starting server');

  app.listen('5566',()=>{
    console.log('>>> vegana file server running on port 5566');
    console.log('>>> live on : http://localhost:5566');
  });

  return 'http://localhost:5566';

}
