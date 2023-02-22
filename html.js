

module.exports = {
  addToHead:addToHead
};

async function addToHead(v){

  const cwd = io.dir.cwd();
  const location = `${cwd}/index.html`;

  let read = await io.read(location);
  read = read.replace("</head>",`\n${v}\n\n</head>`);

  let write = await io.write(location,read);
  if(!write){
    return false;
  } else {
    return true;
  }

}
