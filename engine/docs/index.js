const express = require('express');
const app = express();
const os = require("os");
const get_npm_root = require("get_npm_root");
const cors = require('cors');

app.use(cors());

module.exports = {init:init};

async function init(port){

  let base_path = await get_npm_root();
  let app_path = base_path + "/vegana/bin/docs";
  app.use(express.static(app_path));
  app.get('/*', function(req, res){
    res.sendFile(projectLocation + 'index.html');
  });

  if(!port){port = '5575';}
  common.tell("starting docs server");
  app.listen(port.toString(),()=>{
    common.tell(`docs are live at http://loalhost:${port}`);
  });

  let startServer = `http://localhost:${port}`;

  if(true){
    let os_type = os.type();
    if(os_type === "Windows_NT"){
      cmd.run('start ' + startServer)
      .catch((e)=>{
        common.error(e);
        common.error('open_browser_url failed');
      });
    } else if(os_type === "Linux"){
      cmd.run('xdg-open ' + startServer)
      .catch((e)=>{
        common.error(e);
        common.error('open_browser_url failed');
      });
    }
  }

}
