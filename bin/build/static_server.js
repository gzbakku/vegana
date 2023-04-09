const config = require("./static_server_config.json");
const fssync = require("node:fs");

main();

async function main(){
    let static_dir;
    let dev_path = `${process.cwd()}/static`;
    let mod_path = `${process.cwd()}/node_modules/vegana-static`;
    if(await exists(dev_path,true)){
        static_dir = './static';
    } else if(await exists(mod_path,true)){
        static_dir = './node_modules/vegana-static';
    } else {
        console.error(`!!! not_found vegana-static dev_path => ${dev_path} || mod_path => ${mod_path}`);
        return false;
    }
    const server = require(`${static_dir}/server.js`);
    server.init(config);
}

async function exists(path){
    let access = false;
    let stats;
    try{
        stats = await fssync.lstatSync(path);
    } catch(e){
        access = false;
    }
    if(typeof(stats) === "object"){
        if(stats.isFile() || stats.isDirectory()){access = true;}
    }
    return access;
}