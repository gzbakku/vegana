

module.exports = {
    init:init
};

async function init(){

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

    console.log({config_path:config_path});

}