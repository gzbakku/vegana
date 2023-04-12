const remixicon = require("./remixicon");
const google_fonts = require("./google_fonts/index");

module.exports = {
  init:init
};

async function init(){

  let packages = [
    "remixicon","google_fonts"
  ];

  let package = await get_var(
    3,
    "--install",
    "string",
    "please select the package to install",
    packages
  );
  if(!package){
      return common.error("failed to select the package to install");
  }

  common.tell('installing ' + package);

  if(package === 'remixicon'){
    remixicon.init();
  } else if(package === 'google_fonts'){
    await google_fonts.init();
  } else {
    common.error('please choose a valid package');
    init();
  }

}
