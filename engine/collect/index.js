
const commonComp = require("./commonComp");

module.exports = {
  init:init,
  commonComp:commonComp
};

async function init(type){

  let valid_functions = ['sass','sass-tree','common','commonComps','common-comps'];

  if(!type || valid_functions.indexOf(type) < 0){
    type = await input.select("please select a collect function",['sass','common']);
  }

  if(
    type === "sass" ||
    type === "sass-tree"
  ){
    return await global.sass_collect();
  } else if(
    type === "common" ||
    type === "commonComps" ||
    type === "common-comps"
  ){
    return await commonComp.init();
  }

  common.error("hmmmm, you are not supposed to be here byeeee.");

}
