// ### requirements
var _ = require('underscore'),
    clc = require('cli-color'),
    spawn = require('child_process').spawn;

// ## _class_ SubProcess
//
// spawns a restartable child process with fancy colored output 
//
function SubProcess(o){
  // initialize stdout attributes 
  this.name = o.name || error('o.name required');
  this.color = o.color || error('o.color required');
  this.bg_color = o.bg_color;
  this.prompt = clc[this.color]((o.prompt || this.name)+': ');
  this.error_prompt = this.prompt+ clc.red('ERROR ');
  
  // initialize proccess attributes 
  this.command_string = o.command || error('o.command required');
  this.args = this.command_string.trim().split(/\s/);
  this.command = this.args.shift();
  this.cwd = o.cwd; 
  this.env = _.extend(o.env || {}, process.env);

  // initialize internal properties
  this.node = {};
  this.original_args = this.args.slice(0);
  this.restart_count = 0;

  // start the child process unless directed not to
  if(o.on_startup !== false){
    this.start();
  }
}
 
module.exports = SubProcess;

// ### SubProcess: start()
// 
// spawns a child process
//
SubProcess.prototype.start =  function (){
  console.dev('DEV MODE starting ' + this.name + ' ' + this.restart_count);
  var self = this;
  
  // run the command as a child process
  this.node = spawn(this.command,this.args,{cwd:this.cwd,env:this.env});

  this.setup_output_streams();

  this.node.on('exit',function(){
    console.dev('DEV MODE '+self.name+' '+self.restart_count+' exiting');
    console.dev(Date());
    self.node.pid = undefined;
  });

  ++this.restart_count;
};

SubProcess.prototype.setup_output_streams = function(){
  if(!this.node || !this.node.stdout) return;
  var self = this;

  this.node.stdout.on('data',function(data){
    data.toString().split("\n").forEach(function(line){
      if(!line) return;
      var msg = self.prompt + line + "\n";
      if(self.bg_color) msg = clc[self.bg_color](msg);
      process.stdout.write(msg);
    });
  });

  this.node.stderr.on('data',function(data){
    data.toString().split("\n").forEach(function(line){
      if(!line) return;
      var msg = self.error_prompt + line + "\n";
      if(self.bg_color) msg = clc[self.bg_color](msg);
      process.stderr.write(msg);
    })
  });
};
 
// ### SubProcess: restart( file_name )
// 
// kills the process, re-issues original command, potentially with 
// new arguments.
//
SubProcess.prototype.restart = function(file_path){
  this.args = this.original_args.slice(0);

  // replace [[file_path]] token
  this.args.forEach(function(arg,i){
    this.args[i] = arg.replace(/\[\[file_path\]\]/gi,file_path);
  }.bind(this));

  if(this.node.pid){
    console.dev('DEV MODE killing '+this.name+' '+this.restart_count)
    
    this.node.on('exit',function(){
      this.start();      
    }.bind(this));
    
    this.node.kill();
  } else {
    this.start();
  }
};


// # Helpers
// - dev log
console.dev = function(msg){
  var c_width = 80;
  var center = function(msg) {
    var num_stars = (c_width - (msg.length + 2))/2;
    var star_str = '';
    _(num_stars).times(function() {
      star_str += '*';
    });
    var log_msg = star_str + ' ' + msg + ' ' + star_str;
    while(log_msg.length <= c_width) {
      log_msg += '*';
    }
    return log_msg;
  }

  console.log(clc.bright.green(center(msg)));
}

// - error
function error(msg){
  throw new Error(msg);
}
