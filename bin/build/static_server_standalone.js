const fssync = require("node:fs");
const config = require("./static_server_config.json");

main();

//------------------------------------
//performance testing
//install autocannon from npm => npm i autocannon -g
//
//autocannon -d 10 -p 2 -c 10 http://localhost:5567/
//autocannon -d 20 -p 2 -c 50 http://localhost:5567/
//autocannon -d 30 -p 2 -c 20 http://localhost:5567/
//autocannon -d 60 -p 1 -c 100 http://localhost:5567/
//autocannon -d 60 -p 1 -c 10 http://localhost:5567/
//
//------------------------------------

//------------------------------------
//env vars
//====================================
//(1)
global.env = "dev";
//this var takes the config space
//
//====================================
//(2)
global.fast_mem_flush = true;
global.mem_flush_time = 1000;/*is milliseconds => default is 5000*/
//if true this flushes vm memory in given intervals
//
//====================================
//(3)
global.useLastModified = true;
//this will use a last-modified property from static config file if request contains a valid last-modified http request header then a 304 response status will be sent to reduce response time
//
//====================================
//(3)
global.useCacheControlMaxAge = true;
global.cache_control_max_age_time=60;/*seconds*/
//if this property is set and true a cache control header will be sent with response with given number of seconds
//------------------------------------

//------------------------------------
//resources monitering
//====================================
//(1)
global.start_resources_page = false;
//if set to true you can access system resources via /status page on valid server address
//====================================
//(2)
global.StaticLogTime = true;
//if set to true will console log requets time
//====================================
//(3)
if(true){log_mem_stats(/*milliseconds=>*/2000);}
//if set to true will log memory uasge at given interval
//------------------------------------

async function main(){

    //------------------------------------
    //dynamic static directory for lib dev
    let static_dir;
    if(await exists(`${process.cwd()}/static`,true)){
        static_dir = './static';
    } else if(await exists(`${process.cwd()}/node_modules/vegana-static`,true)){
        static_dir = './node_modules/vegana-static';
    } else {
        console.error("!!! not_found vegana-static");
        return false;
    }
    const server = require(`${static_dir}/standalone/fastify`);
    const tools = require(`${static_dir}/tools`);
    //------------------------------------

    //------------------------------------
    //load static bundle
    let cwd = await tools.io.dir.cwd();
    let path = `${cwd}/js/static_bundle.js`;
    let read = await io.read(path);
    if(!read){
        console.error("!!! failed read file");
        return false;
    }
    if(!config[env]){
        console.error("!!! failed get env from static config");
        return false;
    }
    //------------------------------------

    //------------------------------------
    //run the server
    server.init(config,read);
    //------------------------------------

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

function log_mem_stats(time){
    console.log(">>> periodic mem usage logs enabled");
    function mb(n){
        return `${n/1000000} mb`;
    }
    let last;
    setInterval(()=>{
        let collect = 0;
        let mem = process.memoryUsage();
        if(!last){last = mem;return;}
        let key = 'rss';
        console.log(`mem : ${mb(mem[key])} => ${mb(mem[key]-last[key])} (current-last)`);
        last = mem;
    },time||3000);
}





