const express = require('express');
const app = express();

app.use(express.static(process.cwd()));

module.exports = {init:init};

function init(){

  console.log('>>> starting server');

  app.listen('5566',()=>{
    console.log('>>> vegana file server running on port 5566');
    console.log('>>> live on : http://localhost:5566');
  });

  return 'http://localhost:5566';

}
