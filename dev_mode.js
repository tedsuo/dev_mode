// ### requirements
var watch = require('nodewatch'),
    config = require(process.cwd()+'/dev_mode_config'),
    SubProcess = require(__dirname+'/subprocess');

// ### constants
var CWD = config.cwd || process.cwd(); 
var WATCH_LIST = config.watch_list || [];
var RECURSIVE_WATCH_LIST = config.recursive_watch_list || [];
var PROCESS_DEFINITIONS = config.processes || []; 

// SubProcess Collection
var processes = []; 

// # Main
process.nextTick(function(){
  // initialze sub-processes
  PROCESS_DEFINITIONS.forEach(function(p){
    p.cwd = p.cwd || CWD; 
    processes.push(new SubProcess(p));
  });

  // watch codebase for changes
  WATCH_LIST.forEach(function(path){
    try{
      watch.add(CWD+'/'+path);
    } catch(e){
      console.log(e);
    }
  });

  // watch codebase for changes
  RECURSIVE_WATCH_LIST.forEach(function(path){
    try{
      watch.add(CWD+'/'+path,true);
    } catch(e){
      console.log(e);
    }
  });

  // if any file changes, restart everything
  watch.onChange(function(file,prev,curr){
    var file_path = file.slice(CWD.length+1);
    processes.forEach(function(p){
      p.restart(file_path);
    });
  });

  console.log('DEV MODE watching codebase for changes');
});
