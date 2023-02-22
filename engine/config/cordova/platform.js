module.exports = {

  init:async ()=>{

    if(true){
      const ask = await input.confirm("do you want to add platforms to this cordova app now");
      if(!ask){return true;}
    }

    let currentDirectory = io.dir.cwd()
    let cordovaDir = currentDirectory + "/cordova";

    process.chdir(cordovaDir);

    common.tell("all platform info is available at link given below");
    common.info("https://cordova.apache.org/docs/en/latest/guide/support/");

    let platforms = [];
    async function getPlatforms(){
      platforms = await input.checkboxes("please select platforms to configure for cordova",['android','ios','osx','windows']);
      if(platforms.length === 0){
        return common.error("please select atleast one platform");
      }
    }

    while(platforms.length === 0){
      await getPlatforms();
    }

    for(let platform of platforms){
      common.tell("installing cordova platform => " + platform);
      await cmd.run("cordova platform add " + platform)
      .then(()=>{common.success("cordova platform installed successfully => " + platform);})
      .catch(()=>{
        common.error('failed to install platform => ' + platform);
      });
    }

    process.chdir(currentDirectory);

    return true;

  }

};
