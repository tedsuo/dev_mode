// # EXAMPLE CONFIG FILE
module.exports = {

// ## watch_list
// List of files and directories to monitor.
  watch_list: [
    'app.js'
  ],
  
// ## recursive watch_list
// List of files and directories to monitor.
  recursive_watch_list: [
    'lib',
    'test'
  ],

// ## processes
  processes: [

// ### dev server
    {
      name: 'Example Server https:/localhost:8080/',
      prompt: 'S',
      color: 'magenta',
      command: 'NODE_ENV=development npm start',
      args: []
    },
// ### test suite 
    {
      name: 'Example test suite',
      prompt: 'T',
      color: 'blue',
      command: 'npm', 
      args: ['test']
    }
  ]
}
