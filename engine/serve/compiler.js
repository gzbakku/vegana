const fs = require('fs');
const lazy = require('./lazy');
const sass = require('./sass');
const browserify = require('browserify');
const wasm = require('./wasm');
// const { setEngine } = require('crypto');
const common = require('../../common');
const tinyify = require('tinyify');

module.exports = {
  init:init,
  bundle:bundle,
  appModule:appModule,
  lazyLoader:lazyLoader,
  wasm:wasm.recompile,
  compile:compile
};

async function init(production){
  console.log('>>> compiling app');
  let currentDirectory = await io.dir.cwd(),
  readLocation = currentDirectory + '/compile.js',
  writeLocation = currentDirectory + '/js/bundle.js',
  doCompile = await compile(readLocation,writeLocation,false,false,false,production);
  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  } else {return true;}
}

async function lazyLoader(production){

  return new Promise(async (resolve,reject)=>{

    console.log('>>> compiling lazy modules');

    let adb = await lazy.getAllModules(); //adb = address book
    if(!adb){return common.error('compiler_failed-lazy_loader');}

    let promises = [];
    if(adb.sass && adb.sass.length > 0){
      for(let sassPack of adb.sass){
        promises.push(sass.render(sassPack.read,sassPack.write));
      }
    }
    if(adb.globals && adb.globals.length > 0){
      for(let global of adb.globals){
        promises.push(compile(global.read,global.write,global.sassRead,global.sassWrite,false,production));
      }
    }
    if(adb.pages && adb.pages.length > 0){
      for(let page of adb.pages){
        promises.push(compile(page.read,page.write,page.sassRead,page.sassWrite,false,production));
      }
    }
    if(adb.conts && adb.conts.length > 0){
      for(let cont of adb.conts){
        promises.push(compile(cont.read,cont.write,cont.sassRead,cont.sassWrite,false,production));
      }
    }
    if(adb.panels && adb.panels.length > 0){
      for(let panel of adb.panels){
        promises.push(compile(panel.read,panel.write,panel.sassRead,panel.sassWrite,false,production));
      }
    }
    if(adb.wasm && adb.wasm.length > 0){
      for(let wasmModule of adb.wasm){
        promises.push(wasm.lazy(wasmModule));
      }
    }
    if(adb.uiLibs && adb.uiLibs.length > 0){
      for(let uiLib of adb.uiLibs){
        promises.push(compile(uiLib.read,uiLib.write,uiLib.sassRead,uiLib.sassWrite,false,production));
      }
    }

    Promise.all(promises)
    .then((results)=>{
      resolve(true);
    })
    .catch((error)=>{
      common.error(error);
      reject(false);
    });

  });

}

async function bundle(log_success,production){
  common.tell('compiling app bundle');
  let currentDirectory = await io.dir.cwd() + '/',
  readLocation = currentDirectory + 'compile.js',
  writeLocation = currentDirectory + 'js/bundle.js',

  doCompile = await compile(readLocation,writeLocation,false,false,true,production)
  .then(()=>{return true;}).catch(()=>{return false;});

  // console.log("\n\n");
  // console.log({readLocation:readLocation,writeLocation:writeLocation,doCompile:doCompile});
  // console.log("\n\n");

  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  } else {return true;}
}

async function appModule(type,parents,name,log){

  common.tell('compiling lazy module');

  let readLocation = null,writeLocation = null;
  let currentDirectory = await io.dir.cwd() + "/";
  let baseRead = currentDirectory + 'app/';
  let baseWrite = currentDirectory + 'js/';

  if(
    (
      parents.hasOwnProperty('page') == false &&
      parents.hasOwnProperty('cont') == false &&
      parents.hasOwnProperty('panel') == false
    ) &&
    (
      parents.hasOwnProperty('global') == false
    ) &&
    (
      parents.hasOwnProperty('ui') == false
    )
  ){
    return common.error('invalid-comp_parents');
  }

  if(type == 'page'){
    if(!parents.page){return common.error('not_found-comp_parent_page');}
    readLocation = baseRead + 'pages/'  + parents['page'] + '/page.js';
    writeLocation = baseWrite + 'pages/'  + parents['page'] + '/page.js';
  } else if(type == 'cont'){
    if(!parents.page || !parents.cont){return common.error('not_found-comp_parent_page/cont');}
    readLocation = baseRead + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
    writeLocation = baseWrite + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
  } else if(type == 'panel'){
    if(!parents.page || !parents.cont || !parents.panel){return common.error('not_found-comp_parent_page/cont/panel');}
    readLocation = baseRead + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
    writeLocation = baseWrite + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
  } else if(type == 'global'){
    if(!parents.global){return common.error('not_found-global_comp');}
    readLocation = baseRead + 'globals/'  + parents['global'] + '/globalComp.js';
    writeLocation = baseWrite + 'globals/'  + parents['global'] + '/globalComp.js';
  } else if(type === "ui"){
    if(!parents.ui){return common.error('not_found-uiName');}
    readLocation = baseRead + 'ui/'  + parents['ui'] + '/index.js';
    writeLocation = baseWrite + 'ui/'  + parents['ui'] + '/ui.js';
  } else {
    return common.error("there is no valid module type to update");
  }

  if(log && false){
    console.log("\n\n------------");
    console.log({readLocation:readLocation});
    console.log({writeLocation:writeLocation});
    console.log("---------------\n\n");
  }

  if(!readLocation || !writeLocation){return common.error('invalid-comp_type');}
  let doCompile = await compile(readLocation,writeLocation,false,false,true);
  if(doCompile == false){
    return common.error('failed-lazy_module_compilation');
  } else {return true;}

}

async function compile(readLocation,writeLocation,sassRead,sassWrite,log_success,production){

  

  return new Promise(async (resolve,reject)=>{

    if(sassRead && sassWrite && await io.exists(sassRead)){
      const compile_sass = await sass.render(sassRead,sassWrite)
      .then(()=>{return true;}).catch(()=>{return false;});
      if(!compile_sass){
        reject("failed-sass_compile");
      }
    }

    if(!await io.exists(writeLocation)){
      if(!await makeBaseDir(writeLocation)){
        common.error("failed-make_base_dir");
        reject("failed-make_base_dir");
      }
    }

    // console.log({
    //   readLocation:readLocation,
    //   writeLocation:writeLocation
    // });

    // console.log({
    //   path:path,
    //   last:last
    // });

    // let loc = "D:/workstation/expo/vegana/test/compile.js";
    
    // if(true){
    //   // global.__webpack_require__ = ()=>{};
    //   const esbuild = require('esbuild');
    //   const { externalGlobalPlugin } = require("esbuild-plugin-external-global");
    //   const eslint = require("esbuild-plugin-eslint").default;
    //   try {
    //     let hold = await esbuild.build({
    //       entryPoints: [
    //         readLocation
    //       ],  // Input file
    //       outfile: writeLocation,      // Output file
    //       bundle: true,                   // Bundle all dependencies into one file
    //       minify: production ? true : false,                   // Minify the output
    //       format: 'cjs',
    //       sourcemap: false,                // Generate a source map
    //       // target: ['es2020','chrome58','edge16','firefox57','node12','safari11'],               // Target environment (ES2015 in this case)
    //       target:"es2020",
    //       platform: 'browser',            // Target platform (can be 'node' or 'browser')
    //       plugins: [
    //         externalGlobalPlugin({
    //           'os': 'window.os',
    //         }),
    //         eslint({
    //           "overrideConfig": {
    //             "rules":{
    //               "no-unused-vars": "off",
    //               "no-undef": "off",
    //               "no-prototype-builtins":"off",
    //               "no-dupe-keys":"off",
    //               "no-constant-condition":"off",
    //               "no-async-promise-executor":"off",
    //               "no-constant-binary-expression":"off",
    //               "no-useless-escape":"off",
    //               "no-func-assign":"off",
    //               "no-unsafe-negation":"off",
    //               "no-unreachable":"off",
    //               "no-empty":"off",
    //               "no-redeclare":"off",
    //               "valid-typeof":"off",
    //               "no-self-assign":"off",
    //               "duplicate-object-key":"off",
    //               "impossible-typeof":"off"
    //             }
    //           }
    //         })
    //       ],
    //     });
    //     // console.log('Build completed successfully.');
    //     // console.log(hold);
    //     resolve();
    //   } catch (error) {
    //     console.error('Build failed:', error);
    //     reject();
    //   }
    // }

    // const babel = require("@babel/core");
    // console.log(babel);
    // fs.readFile(readLocation, 'utf8', (err, code) => {
    //   if (err) {
    //     console.error('Error reading file:', err);
    //     return;
    //   }
    //   // Use Babel to transform the code
    //   babel.transform(
    //     code,
    //     {
    //       presets: ['@babel/preset-env'],
    //     },
    //     (err, result) => {
    //       if(err){
    //         console.error('Error transforming file:', err);
    //         return;
    //       }  
    //       console.log("compiled");
    //       console.log(result);   
    //       // // Write the transformed code to a new file
    //       // const outputFilePath = path.join(__dirname, 'dist', 'index.js');
    //       // fs.writeFile(outputFilePath, result.code, (err) => {
    //       //   if (err) {
    //       //     console.error('Error writing file:', err);
    //       //     return;
    //       //   }
    //       //   console.log('File successfully compiled to:', outputFilePath);
    //       // });
    //     }
    //   );
    // });

    // if(true){
    //   let hold = writeLocation.split("/");
    //   let last = hold[hold.length-1];
    //   let path = writeLocation.replace(last,"");
    //   const webpack = require('webpack');
    //   console.log({mode:production ? "production" : "development"});
    //   const ESLintPlugin = require('eslint-webpack-plugin');
    //   webpack(
    //     [
    //       { 
    //         mode:production ? "production" : "development",
    //         entry: readLocation, 
    //         output: {
    //           path:path,
    //           filename:last
    //         },
    //         "target": "web",
    //         // plugins: [new ESLintPlugin({
    //         //   emitError :true,
    //         //   failOnError:true,
    //         //   // rules: [
    //         //   //   {
    //         //   //     test: "/\.js$/",
    //         //   //     exclude: "/node_modules/",
    //         //   //     use: 'eslint-loader',
    //         //   //   },
    //         //   // ],
    //         // })],
    //         // stats: {
    //         //   errors: true, // ⚠️  Absolutely not recommended
    //         //   warnings: false
    //         // },
    //         module: {
    //           rules: [
    //             // {
    //             //   test: "/\.m?js$/",
    //             //   exclude: "/node_modules/",
    //             //   use: {
    //             //     loader: "babel-loader",
    //             //     options: {
    //             //       presets: ['@babel/preset-env']
    //             //     }
    //             //   }
    //             // },
    //             {
    //               test: "/\.js$/",
    //               exclude: "/node_modules/",
    //               use: 'eslint-loader',
    //               enforce: 'pre',
    //             },
    //           ]
    //         }
    //         // stats: 'errors-only',
    //       },
    //     ],
    //     (err, stats) => {
    //       console.log({err:err});
    //       console.log({stats:stats});
    //       console.log(stats.hasErrors());
    //       console.log(stats.stats.compilation);
    //       if (stats.hasErrors()) {
    //         // console.log(stats.);
    //       }
    //       if(err){
    //         console.error(err);
    //         return reject(err);
    //       }
    //       process.stdout.write(stats.toString() + '\n');
    //       resolve();
    //     }
    //   );
    //   // console.log({w_compiler:w_compiler});
    // }

    let yo = browserify({ debug: false })
    .require(readLocation,{entry: true});
    if(global.VeganaBuildProduction || production){
      yo
      .transform(require('unassertify'), { global: true })
      .transform(require('@browserify/envify'), { global: true });
      let UglifyJS = require("uglify-js");
      let ss = "";
      let reader = yo.bundle()
      .on("error", (err)=>{
        if(err.message){
          reject(err.message);
          return;
        }
        reject(err);
      })
      .on("end", (e,f)=>{
        resolve();
      });
      reader.on('data', function(chunk){
        ss += chunk.toString();
      });
      reader.on('end', function(){
        let result = UglifyJS.minify(ss,{
          toplevel: false,
          warnings:"verbose",
          // mangle: {
          //   properties:false
          // },
          // // mangle:true,
          module:false,
          // keep_fnames:false,
          // keep_fargs:false,
          sourceMap:true
        });
        // console.log({after:ss.length - result.code.length});
        if(!result.code){
          common.error(`failed compile at => ${readLocation}`);
          // common.error(result.error);
          return reject(result.error);
        } else {
          fs.writeFile(writeLocation,result.code,(err)=>{
              if (err) {
                console.error('Error writing file:', writeLocation);
                return reject(err);
              }
              // console.log('File successfully compiled to:', writeLocation);
          });
          fs.writeFile(`${writeLocation}.map`,result.map,(err)=>{
            if (err) {
              console.error('Error writing file:', writeLocation);
              return reject(err);
            }
            // console.log('File successfully compiled to:', writeLocation);
          });
        }
      });
    }
    
    else {

      yo.bundle()
      .on("error", (err)=>{
        if(err.message){
          reject(err.message);
          return;
        }
        reject(err);
      })
      .on("end", (e,f)=>{
        resolve();
      })
      .pipe(fs.createWriteStream(writeLocation));

      // console.log(hh);
      //     let ss = '';
      //     hh.on('data', function(chunk){
      //       // console.log('Chunk read');
      //       // console.log(chunk.toString());
      //       ss += chunk.toString();
      //    });
      //    var UglifyJS = require("uglify-js");
      //    hh.on('end', function(chunk){
      //     // console.log('Chunk read');
      //     // console.log(chunk.toString());
      //     // ss += chunk.toString();
      //     // console.log(ss.length);
      //     var result = UglifyJS.minify(ss);
      //     console.log({after:ss.length - result.code.length});
      //  });
      // var UglifyJS = require("uglify-js");
      //  var result = UglifyJS.minify(hh);
      // console.log({after:result.code.length});
      // .pipe(require('minify-stream')({ sourceMap: false }))
      // .pipe(fs.createWriteStream(writeLocation));

    }

  })
  .then(()=>{
    if(log_success){
      common.success(`module compiled => ${readLocation}`);
    }
    return true;
  })
  .catch((e)=>{
    if(typeof(e) === "string"){
      common.error(`${e}`);
    }
    if(e instanceof Object){
      common.error(`line : ${e.line} column : ${e.column}`);
      common.error('\nstart------------------------\n');
      common.error(e.annotated);
      common.error('\n------------------------end\n');
    }
    common.error(`failed compile => ${readLocation}`);
    return false;
  });

}

async function makeBaseDir(path){
  let collect = '',hold = io.clean_path(path).split("/")
  for(let i=0;i<hold.length-1;i++){
    collect += hold[i] + "/";
  }
  if(!await io.dir.ensure(collect)){return false} else {return collect;}
}
