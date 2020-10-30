const fs = require('fs-extra');

module.exports = {

  exists:async (location)=>{
    return fs.exists(location);
  },

  dir:{
    cwd:()=>{
      return process.cwd();
    },
    app:()=>{
      let scriptAddressRef = process.argv[1];
      if(scriptAddressRef.length === 0){return '';}
      while(scriptAddressRef.indexOf("\\") >= 0){
        scriptAddressRef = scriptAddressRef.replace('\\','/');
      }
      let scriptMidPoint = scriptAddressRef.lastIndexOf("/");
      let clean = scriptAddressRef.substring(0,scriptMidPoint);
      let hold = clean.split("/");
      if(hold[hold.length - 1] !== "bin"){clean += "/bin";}
      return clean;
    },
    ensure:async (location)=>{
      // if(await io.exists(location)){
      //   return true;
      // }
      return fs.ensureDir(location)
      .then(()=>{
        return true;
      })
      .catch((err)=>{
        common.error(err)
        return common.error('failed-ensure-dir-io');
      });
    },
    create:(location)=>{
      return fs.mkdir(location)
      .then(()=>{
        return true;
      })
      .catch((err)=>{
        common.error(err)
        return common.error('failed-create-dir-io');
      });
    }
  },

  copy:async (from,to)=>{
    return fs.copy(from,to)
    .then(()=>{
      return true;
    })
    .catch((error)=>{
      common.error(error);
      return common.error("failed-copy-io");
    });
  },

  readJson:async (location)=>{
    let run = await fs.readFile(location,'utf-8')
    .then((data)=>{
      return data;
    })
    .catch((err)=>{
      common.error(err);
      return common.error("failed-readJson-io");
    });
    if(run){
      return JSON.parse(run);
    } else {
      return false;
    }
  },

  read:(location)=>{
    return fs.readFile(location,'utf-8')
    .then((data)=>{
      return data;
    })
    .catch((err)=>{
      common.error(err);
      return common.error("failed-read_file-io");
    });
  },

  write:(location,data)=>{
    return fs.writeFile(location,data,'utf-8')
    .then(()=>{
      return true;
    })
    .catch((err)=>{
      common.error(err);
      return common.error("failed-write-io");
    });
  },

  delete:(location)=>{
    return fs.remove(location)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });
  }

};
