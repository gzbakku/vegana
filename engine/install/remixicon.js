
module.exports = {
  init:init
};

async function init(){

  if(true){
    check_vegana_directory.init();
  }

  if(true){
    const base_script = 'npm i remixicon';
    const base_run = await cmd.run(base_script)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });
  }

  if(true){
    common.tell('generating remixicon.css');
    const cwd = io.dir.cwd();
    const from = `${cwd}/node_modules/remixicon/fonts/remixicon.css`;
    const to = `${cwd}/css/remixicon.css`;
    const copy = io.copy(from,to)
    .then(()=>{
      common.success('installed remixicon.css');
    })
    .catch((e)=>{
      common.error(e);
    });
  }

  if(true){
    common.tell('linking in index.html->remixicon.css');
    const addToHtml = html.addToHead('<link rel="stylesheet" href="/css/remixicon.css">');
    if(!addToHtml){
      common.error("failed-add-remixicon-to_index.html");
    }
  }

  if(true){
    const boundry = "\n----------------------------------\n";
    let message = '';
    message += "\n\n";
    message += boundry;
    message += 'remixicon docs are avilable at : https://github.com/Remix-Design/RemixIcon\n\n';
    message += 'to add remixicon u should build the following element';
    message += boundry;
    message += "\n\n";
    message += `engine.make.element({parent:'some',tag:'i',class:"ri-admin-line"});\n\n`;
    common.tell(message);
  }

  common.success("installation successfull.\n\n");

}
