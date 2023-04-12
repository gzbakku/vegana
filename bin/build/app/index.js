
//import all the pages here which you want to included in the bundle.
const mainPage = require('./pages/mainPage/page');

//this is the main page that you want to include with the bundle
//you dont have to include a page with the bundle
//if you dont include a page you can lazy load a page
const startPage = mainPage; //declare the first page module here

//load ui libs, these libs can be lazy loaded in future.
require("./ui/index");

engine.config(require("./config.json"));
engine.stylesheet(require("./stylesheet.json"));
engine.set.icon("assets/favicon.ico");

//this function impliments the routing logic
function route_logic(){

  //you will get page,cont,panel and params for you to route to.
  let url = engine.make.url.parse();

  if(engine.router.active.page == null){
    //when there is no page you have to init one.
    startPage.init(/*pass conts and further data to the page*/url);
  }

}

//if static usually you have already routed to the resource
//static web is the html file static server sends to the user
if(is_static || !is_static_web){
  route_logic();
}
