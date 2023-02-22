const remixicon = require("./remixicon");

module.exports = {
  init:init
};

async function init(package){

  let packages = [
    "remixicon","none"
  ];

  if(!package){
    package = await input.select("please choose a module",packages);
  }

  common.tell('installing ' + package);

  if(package === 'remixicon'){
    remixicon.init();
  } else {
    common.error('please choose a valid package');
    init();
  }

}
