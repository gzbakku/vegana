//pages
const main = require('./pages/mainPage/index');
//add further pages module here

//engine
const router = require('vegana-engine').router;

//check inital page
if(router.active.page == null){
  loadPage();
}

//set the first page ref to this variable
var ref = main.ref;

//load initial page
function loadPage(){
  router.active.page = ref;
  router.built.page.push(ref);
  main.init();						//initiarte the first page here
}
