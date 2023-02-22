(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-request';
const pageName = 'docsPage';
const contName = 'requestCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build();                                                             //start dom build here

}

const trackers = {
  title:'Vegana Api : Engine Params Add',
  meta:[
    {
      name:'description',
      content:'how to add a url parameter in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,add'
    }
  ],
  function_data:{},
  function:(function_data)=>{}
};

function build(){
  const article = require("./vDoc.json");
  engine.ui.getComp("commonUi","articleComp").init(contId,{
    article:article
  });
}

const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{},
  trackers:trackers
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;

},{"./vDoc.json":2}],2:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza60kkm5zx9x7"
  ],
  "rows": {
    "2iyza60kkm5zx9x7": {
      "id": "2iyza60kkm5zx9x7",
      "template": [
        "2iyza60kkm5zxaor",
        "2iyza60kkm5zxcbm",
        "2iyza60kkm5zxdxm"
      ],
      "containers": {
        "2iyza60kkm5zxaor": {
          "id": "2iyza60kkm5zxaor",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.request"
            }
          }
        },
        "2iyza60kkm5zxcbm": {
          "id": "2iyza60kkm5zxcbm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this vegana engine api is a cover of web fetch api, but on native platforms ie cordova electron or native os apps this wrapper exposes native os apis too but with the same interface as web fetch api."
            }
          }
        },
        "2iyza60kkm5zxdxm": {
          "id": "2iyza60kkm5zxdxm",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//please support creators of \n/*\n\n\thttps://reqres.in\n\n*/\n\n\nconst query = await engine.request({\n\turl:'https://reqres.in/api/login',\n\tmethod:'post',\n    body:{\n    \t\"email\": \"eve.holt@reqres.in\",\n        \"password\": \"cityslicka\"\n    }\n});\n\nconsole.log(query);\n\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
