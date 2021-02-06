const Spinner = require('cli-spinner').Spinner;
// const fs = require('fs-extra');

const copy = require("./copy");
const edit = require("./edit");
const npm = require("./npm");

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

  if(!projectName || typeof(projectName) !== "string" || projectName.length === 0){
    spinner.stop();
    return common.error('no project_name found');
  }

  common.tell('project Name : ' + projectName);

  //make the dir
  const projectDir = io.dir.cwd() + "/" + projectName;
  if(await io.exists(projectDir) && false){
    spinner.stop();
    return common.error("Directory with this project name already exists at location => " + projectDir);
  } else {
    await io.dir.ensure(projectDir);
  }

  if(true){
    const do_copy = await copy.init(projectDir);
    if(!do_copy){
      spinner.stop();
      return common.error("failed-generate-project-files");
    }
  }

  if(true){
    const do_edit = await edit.init(projectDir,projectName);
    if(!do_edit){
      spinner.stop();
      return common.error("failed-customize_index_file");
    }
  }

  if(true){
    const do_npm = await npm.init(projectDir);
    if(!do_npm){
      spinner.stop();
      common.error("failed-config-npm");
      common.error("failed-install-vegana_engine");
      common.tell("please run 'npm init'");
      return common.tell("and then run 'npm i vegana-engine' to install the core engine or delete the folder and try again.");
    }
  }

  common.success("project generated successfully");

  spinner.stop();
  return true;

}
