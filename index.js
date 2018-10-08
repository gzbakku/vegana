let engine = require('./engine/engine');

//console.log(process.argv);

let work = process.argv[2];

//console.log(work);

if(
    work !== 'new' &&
    work !== 'serve' &&
    work !== 'build' &&
    work !== 'generate' 
){
    console.error('invalid arguments');
    return false;
}

engine[work]();
