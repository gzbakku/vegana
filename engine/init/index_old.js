const Spinner = require('cli-spinner').Spinner;
const fs = require('fs-extra');

module.exports= {
  init:init
};

async function init(projectName,location){

  if(!projectName){
    projectName = await input.text("please give a project name");
  }

  common.tell('making new project');

  var spinner = new Spinner('%s : ');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  //???????????????????????????
  //security checks

  if(projectName == null || projectName == undefined){
    return common.error('no project_name found');
  }

  if(typeof(projectName) !== 'string'){
    return common.error('invalid projectName_type');
  }

  if(projectName.length < 3){
    return common.error('project name should be atleast 4 letters long.');
  }

  if(location == null || location == undefined){
    return common.error('no current_folder_location found');
  }

  common.tell('project Name : ' + projectName);

  //???????????????????????????????
  //make project

  //do npm

  let checkNpm = await doNpm();

  if(checkNpm == false){
    return common.error('configure npm failed');
  }

  //build project files

  let buildProject = await build(projectName);

  if(buildProject == false){
    return common.error('project build failed');
  } else {
    spinner.stop();
    common.tell('@@@ project created successfully');
  }

}

async function build(projectName){

  common.tell('building project');

  //???????????????????????????
  //get addresses

  let scriptAddressRef = process.argv[1];
  while(scriptAddressRef.indexOf("\\") >=0){
    scriptAddressRef = scriptAddressRef.replace("\\","/");
  }
  let scriptMidPoint = scriptAddressRef.lastIndexOf('/');

  //prod
  let currentDirectory = io.dir.cwd() + '/';
  let appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '/build/';

  while(currentDirectory.indexOf("\\") >=0){
    currentDirectory = currentDirectory.replace("\\","/");
  }

  let splint = currentDirectory.split("/");

  if(splint[splint.length - 2] !== projectName){
    currentDirectory += projectName + "/";
  }

  //???????????????????????????
  //copy files

  let files = [
    'index.html',
    'compile.js',
    'lazy.json',
    'css',
    'app',
    'js',
    'assets',
    'sass',
    '.gitignore'
  ];

  let success = true;
  let failed = [];

  for(var i=0;i<files.length;i++){

    let fileLocation = appDirectory + files[i];
    let fileDestination = currentDirectory + files[i];

    if(true){
      let copy = await io.copy(fileLocation,fileDestination)
      .then(()=>{
        return true;
      })
      .catch((error)=>{
        return false;
      });
      if(copy == false){
        success = false;
        failed.push(files[i]);
      }
    }

  }

  if(success == false){
    common.tell(failed);
    common.error('something went wrong while building project');
    return common.error('please remove all the contents from the folder and try again');
  }

  //???????????????????????????
  //edit index.html for projectName

  //index.html destination
  fileDestination = currentDirectory + 'index.html';

  //read index here
  let index = await fs.readFile(fileDestination,'utf-8')
  .then((data)=>{
    //console.log(typeof(data));
    return data;
  })
  .catch((err)=>{
      console.log(err);
      return false;
  });

  //check read index here
  if(index == false){
    return common.error('read_failed index.html');
  }

  //replace the title of index with project name here
  let final = index.replace('xxxx',projectName);

  //write the changes to the index.html
  let write = await fs.writeFile(fileDestination,final,'utf-8')
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    console.log(err);
    return false;
  });

  //console.log(write);

  //check the write
  if(write == false){
    return common.error('write_failed index.html');
  }

  return true;

}

async function doNpm(){

  let command = 'npm init -y';

  const npmInit = await cmd.run(command)
  .then((stdout)=>{
    return true;
  })
  .catch((err)=>{
    return common.error(err);
  },(stderr)=>{
    return common.error(stderr);
  });

  if(npmInit == false){
    return common.error('npm_init failed');
  }

  //install vegana-engine

  common.tell('installing vegana-engine npm module');

  command = 'npm i vegana-engine';

  const installVeganaEngine = await cmd.run(command)
  .then((stdout)=>{
    return true;
  })
  .catch((err)=>{
    //console.log(err);
    return err;
  },(stderr)=>{
    common.error(stderr);
    return false;
  });

  if(installVeganaEngine == false){
    return common.error('cannot_install vegana-engine');
  }

  if(installVeganaEngine !== true){
    if(installVeganaEngine.search('WARN') == 0){
      return common.error('npm_install_failed vegana-engine');
    }
  }

  return true;

}
