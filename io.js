const fs = require('fs-extra');

module.exports = {

  copy:async (from,to)=>{
    return fs.copy(from,to)
    .then(()=>{
      return true;
    })
    .catch((error)=>{
      return common.error(error);
    });
  }

};
