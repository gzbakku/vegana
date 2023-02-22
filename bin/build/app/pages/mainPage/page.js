//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-main";
const pageName = 'mainPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//build page
function build(){

  engine.common.tell('building',log);

  let imageCont = engine.make.div({
    id:'imageCont',
    parent:pageId,
    class:'image-cont'
  });

    engine.make.image({
      id:'logo',
      parent:imageCont,
      class:'logo-image',
      type:'local',
      location:'assets/images/logo.png'
    });

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:pageId,
    class:'greetings',
    text:'Welcome to Vegana JS'
  });

  let tagCont = engine.make.div({
    id:'tagCont',
    parent:pageId,
    class:'tag-cont'
  });

    engine.make.image({
      id:'logo',
      parent:tagCont,
      class:'tag-image',
      type:'local',
      location:'assets/images/logo-tag.png'
    });

  return true; //always return after the build completes

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{}
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
