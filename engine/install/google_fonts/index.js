const extract = require('extract-zip')

module.exports = {
    init:init
};

async function init(){

    if(!await check_vegana_directory.init()){
        return false;
    }

    // process.argv.push(`--google-font=Anuphan`);

    // process.argv.push(`--google-font=Montserrat`);

    let font_name = await get_var(
        4,
        "--google-font",
        "string",
        "please provide a google font name",
        null
    );
    if(!font_name){
        return common.error("failed to get a font_name");
    }

    //sample link
    //https://fonts.google.com/download?family=Anuphan

    let location = `https://fonts.google.com/download?family=${font_name}`;

    let font_name_full = font_name.trim().replaceAll(' ','_');

    console.log({
        font_name_full:font_name_full
    });

    let cwd = await io.dir.cwd();
    let downloads = `${cwd}/downloads`;
    let dir_to_extract = `${downloads}/${font_name_full}`;
    let download_location = `${downloads}/${font_name_full}.zip`;

    if(!await io.dir.ensure(downloads)){
        return common.error(`failed ensure dir => ${downloads}`);
    }
    // if(!await io.dir.ensure(dir_to_extract)){
    //     return common.error(`failed ensure dir => ${dir_to_extract}`);
    // }

    let exists = await io.exists(download_location);

    if(!exists){
        let get = await fetch(location)
        .then(async (response)=>{
            let body = await response.blob();
            if(typeof(body) !== "object"){return false;}
            body = await body.arrayBuffer();
            if(!await io.writeRaw(download_location,body)){
                return common.error(`failed write sample zip file at => ${sample_file_location}`);
            }
            return common.tell(`font downloaded => ${download_location}`);
        })
        .catch((e)=>{
            common.error(e);
            return common.error(`failed get google_font at => ${location}`);
        });
        if(!get){
            return false;
        }
    } else {
        common.tell(`using already downloaded font zip => ${download_location}`);
    }

    exists = await io.exists(dir_to_extract);

    if(!exists){
        if(!await extract_zip_to_dir(download_location,dir_to_extract)){
            return false;
        }
    } else {
        common.tell(`using already extracted font zip dir at => ${dir_to_extract}`);
    }

    let font_files = await get_all_ttf_fonts(dir_to_extract);
    if(!font_files){
        return common.error(`no ttf files found in dir => ${dir_to_extract}`);
    }

    let font_names = [];
    let font_book = {};
    for(let font_file of font_files){
        font_names.push(font_file.name);
        font_book[font_file.name] = font_file.path;
    }

    let font_file = await get_var(
        null,
        null,
        "string",
        "please select a font file",
        font_names
    );
    if(!font_file){
        return common.error("failed to get a font_file");
    }

    let font_file_path = font_book[font_file];

    //copy
    let spl = io.clean_path(font_file_path).split("/");
    let file_name = spl[spl.length-1];
    if(!file_name.includes(".ttf")){
        return common.error(`failed to extract the ttf file name from this location => ${font_file_path}`);
    }
    let to_dir = `${cwd}/assets/fonts`;
    if(!await io.dir.ensure(to_dir)){
        return common.error(`failed ensure fonts dir => ${to_dir}`);
    }
    let to = `${to_dir}/${file_name}`;
    if(!await io.copy(font_file_path,to)){
        return common.error(`failed copy font file to assets from => ${font_file_path} to => ${to}`);
    }

    let insert_where = await get_var(
        null,
        null,
        "string",
        "where do you want to insert the font.",
        ['stylesheet','themes']
    );
    if(!insert_where){
        return common.error("failed to get a module to insert the font file.");
    }

    let font_location = `assets/fonts/${file_name}`;

    if(insert_where === "themes"){
        if(!await require("./themes").init(font_location)){
            return false;
        }
    } else {
        if(!await require("./stylesheet").init(font_location)){
            return false;
        }
    }

    return common.success("font install successfully");

}

async function get_all_ttf_fonts(font_dir){

    async function extract_dir(path){

        let items = await dir.get_dir_items(path);
        if(!items){
            return common.error(`failed get ttf files form dir => ${path}`);
        }
        
        let fonts = [];
        for(let file of items.files){
            if(file.includes(".ttf")){
                fonts.push({
                    name:file,
                    path:`${path}/${file}`
                });
            }
        }

        for(let dir of items.dirs){
            let now = await extract_dir(`${path}/${dir}`);
            if(!(now instanceof Array)){
                return false;
            } else {
                for(let item of now){
                    fonts.push(item);
                }
            }
        }

        return fonts;

    }

    let fonts = await extract_dir(font_dir);
    if(!(fonts instanceof Array)){
        return false;
    } else {
        return fonts;
    }

}

async function extract_zip_to_dir(download_location,dir_to_extract){
    return new Promise(async (resolve,reject)=>{
        try {
            await extract(download_location, { dir: dir_to_extract })
            common.tell('Extraction complete');
            resolve();
        } catch (e) {
            reject(e);
        }
    })
    .then(()=>{
        return true;
    })
    .catch((e)=>{
        common.error(e);
        return common.error(`failed extract zip => ${download_location} to => ${dir_to_extract}`);
    });
}