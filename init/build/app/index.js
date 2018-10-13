//pages
const main = require('./pages/main/index');
//add further pages module here

//engine
const router = require('vegana-engine').router;

//check inital page
if(router.active.page == null){
  loadPage();
}

//set the first page ref to this variable
let ref = main.ref;

//load initial page
function loadPage(){
  router.active.page = ref;			
  router.built.page.push(ref);		
  main.init();						//initiarte the first page here
}
