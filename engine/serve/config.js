

module.exports = {
    init:init
};

async function init(enable_config_production){

    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`; 
    const config_path = `${app_dir}/config.json`;
    if(!await io.exists(config_path)){
        return common.error(`!!! not_found config => ${config_path}`);
    }

    let read = await io.readJson(config_path);
    if(!read){
        return common.error(`!!! failed config => ${config_path}`);
    }

    let read_updated = false;
    if(!enable_config_production){
        if(read.production){read.production = false;read_updated = true;}
    }
    if(read_updated){
        if(!await io.write(config_path,JSON.stringify(read,null,2))){
            return common.error(`failed update config.json => ${config_path}`);
        }
    }

    return true;

}