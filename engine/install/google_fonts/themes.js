

module.exports = {
    init:init
};

async function init(font_file){

    let cwd = await io.dir.cwd();
    let themes_dir = `${cwd}/app/themes`;

    if(!await io.dir.ensure(themes_dir)){
        return common.error(`failed ensure dir => ${themes_dir}`);
    }

    let items = await dir.get_dir_items(themes_dir);
    if(!items){
        return common.error(`failed get dir items => ${themes_dir}`);
    }

    let themes = [];
    for(let file of items.files){
        if(file.includes(".json")){
            themes.push(file);
        }
    }

    let select_theme = await get_var(
        null,
        null,
        "string",
        "please select a theme to install font",
        themes
    );
    if(!select_theme){
        return common.error("failed to select a theme to install the font");
    }

    let theme_path = `${themes_dir}/${select_theme}`;

    let read = await io.readJson(theme_path);
    if(!read){
        common.error("please ensure this file is a valid json object");
        return common.error(`failed read theme as a json file => ${theme_path}`);
    }

    let installed_fonts = [];
    if(read.fonts instanceof Object){
        for(let font_name in read.fonts){
            installed_fonts.push(font_name);
        }
    }
    
    let install_to_font = await get_var(
        null,
        null,
        "string",
        "please select a font to install the file",
        installed_fonts
    );
    if(!install_to_font){
        return common.error("failed to select a font to install the file");
    }

    read.fonts[install_to_font].location = font_file;

    if(!await io.write(theme_path,JSON.stringify(read,null,2))){
        return common.error(`failed update theme file => ${theme_path}`);
    }

    return true;

}