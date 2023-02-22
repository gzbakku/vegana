const builder = require("electron-builder");
const Platform = builder.Platform;


/*
-----------------------------------

checkout electron builder for build instructions and configurations

https://www.electron.build/

https://github.com/electron-userland/electron-builder

*/

build();

async function build(){

  await builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      "appId":"app.vegana.vegana_app",
      "productName":"vegana_app",
      "copyright":"your_name",
      "directories":{
        "output":"build/electron"
      },
      "win":{
        "target":"nsis"
      },
      "linux":{
        "target":"AppImage"
      }
    }
  })
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    console.error(e);
    return false;
  });

}
