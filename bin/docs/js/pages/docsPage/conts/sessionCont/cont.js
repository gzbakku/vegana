(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-session';
const pageName = 'docsPage';
const contName = 'sessionCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid,data) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build(data);                                                             //start dom build here

}

function build(data){

  if(!data){data = {};}
  if(!data.panel){data.panel = 'introPanel';}

  require("./panels/introPanel/panel");
  require("./panels/getPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","sessionCont",data.panel);
  engine.router.navigate.to.panel(mod);

}

const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{},
  trackers:null
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;

},{"./panels/getPanel/panel":2,"./panels/introPanel/panel":4}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-get';
const pageName = 'docsPage';
const contName = 'sessionCont';
const panelName = 'getPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

const trackers = {
  title:'Vegana Api : Engine Session Get',
  meta:[
    {
      name:'description',
      content:'how to get stored session information in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,session,get,user,info,token,uid'
    }
  ],
  function_data:{},
  function:(function_data)=>{}
};

function build(){
  const article = require("./vDoc.json");
  engine.ui.getComp("commonUi","articleComp").init(panelId,{
    article:article
  });
}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{"./vDoc.json":3}],3:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza5rskm6zdtqk"
  ],
  "rows": {
    "2iyza5rskm6zdtqk": {
      "id": "2iyza5rskm6zdtqk",
      "template": [
        "2iyza5rskm6zduuk",
        "2iyza5rskm6zdwgc",
        "2iyza5rskm6zdwsc"
      ],
      "containers": {
        "2iyza5rskm6zduuk": {
          "id": "2iyza5rskm6zduuk",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.session.get"
            }
          }
        },
        "2iyza5rskm6zdwgc": {
          "id": "2iyza5rskm6zdwgc",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api fetches information stored with evgana sessions api and contains multiple sub apis to point to vegana session template."
            }
          }
        },
        "2iyza5rskm6zdwsc": {
          "id": "2iyza5rskm6zdwsc",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//=================================\n//\tstart test session\n//=================================\nlet token_object = {\n\tsessionId:'asd897897',\n\tuid:\"as908sa09d\",\n    user:{\n    \tname:\"gzbakku\",\n       \tuid:'as098d908098098'\n    }\n};\n\nlet start_session = engine.session.start(token_object,token_object.user,token_object.user.uid,false);\n\nconsole.log({start_session:start_session});\n\n//=================================\n//\tget user object\n//=================================\n\nconst user = engine.session.get.user();\n\nconsole.log({user:user});\n\n//=================================\n//\tget token object\n//=================================\n\nconst token = engine.session.get.token();\n\nconsole.log({token:token});\n\n//=================================\n//\tget uid object\n//=================================\n\nconst uid = engine.session.get.uid();\n\nconsole.log({uid:uid});\n\n//=================================\n//\tget session_type object\n//=================================\n\nconst session_type = engine.session.get.session_type();\n\nconsole.log({session_type:session_type});\n\n//=================================\n//\tend test session\n//=================================\n\nconst end_session = engine.session.end();\n\nconsole.log({end_session:end_session});\n\n//=================================\n//\tplease dont leave a session floating\n//=================================\n"
            }
          }
        }
      }
    }
  }
}
},{}],4:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-intro';
const pageName = 'docsPage';
const contName = 'sessionCont';
const panelName = 'introPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

const trackers = {
  title:'Vegana Api : Engine Session Introduction',
  meta:[
    {
      name:'description',
      content:'introduction to vegana session api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,session,introduction'
    }
  ],
  function_data:{},
  function:(function_data)=>{}
};

function build(){
  const article = require("./vDoc.json");
  engine.ui.getComp("commonUi","articleComp").init(panelId,{
    article:article
  });
}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{"./vDoc.json":5}],5:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza5rskm6zdtqk"
  ],
  "rows": {
    "2iyza5rskm6zdtqk": {
      "id": "2iyza5rskm6zdtqk",
      "template": [
        "2iyza5rskm6zduuk",
        "2iyza5rskm6zdwgc",
        "2iyza5rskm6zdwsc"
      ],
      "containers": {
        "2iyza5rskm6zduuk": {
          "id": "2iyza5rskm6zduuk",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana session api"
            }
          }
        },
        "2iyza5rskm6zdwgc": {
          "id": "2iyza5rskm6zdwgc",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this is a simple wrapper around data api to manage session information easily,and extend some functionality to check session information.defined session api reduces code size and reduce complexity while implimenting authentication."
            }
          }
        },
        "2iyza5rskm6zdwsc": {
          "id": "2iyza5rskm6zdwsc",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//=================================\n//\tsession start api params\n//=================================\n/*\n\t\n    engine.session.start(token_object,user_object,uniqe_user_id_string,remember_session_boolean);\n\t\n*/\n\nlet token_object = {\n\tsessionId:'asd897897',\n\tuid:\"as908sa09d\",\n    user:{\n    \tname:\"gzbakku\",\n       \tuid:'as098d908098098'\n    }\n};\n\nlet start_session = engine.session.start(token_object,token_object.user,token_object.user.uid,false);\n\nconsole.log({start_session:start_session});\n\n//=================================\n//\tsession end api params\n//=================================\n\nlet check_session = engine.session.check();\n\nconsole.log({check_session:check_session});\n\n//=================================\n//\tsession end api params\n//=================================\n\nlet end_session = engine.session.end();\n\nconsole.log({end_session:end_session});\n\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
