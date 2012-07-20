var fs = require('fs');

var READ_PATH = __dirname+'/example_dev_mode_config.js';
var WRITE_PATH =  process.cwd()+'/dev_mode_config.js';

var file_exists;

try{
  fs.statSync(WRITE_PATH);
  file_exists = true;
} catch(e) {
  file_exists = false;
}

if(file_exists){
  console.log(WRITE_PATH+' already exists');
  process.exit(1);
}

fs.writeFileSync(WRITE_PATH,fs.readFileSync(READ_PATH));
