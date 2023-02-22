
/*

  (1) only put comp.js files as comp module in comps object

  (2) if you want to exclude a comp rename its comp.js file to _comp.js file it will be ignored but warn you with a error, else disable the comp yourself in integrate.js

  (3) all sass files will be integrated in vegana_tree.scss automatically if you want to collect manually run "$ vegana sass collect"

  (4) to make lazy comps run generate command with --lazy flag

  (5) dont edit the init function i mean do what you want but it can break it so be carefull

*/

const comps = {/*comps goes here*/};

module.exports = {init:init};
function init(){
  for(let comp in comps){
    engine.add.comp(comp,comps[comp]);
  }
}
