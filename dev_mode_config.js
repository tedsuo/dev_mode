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
      name: 'Example Server',
      prompt: 'S',
      color: 'magenta',
      command: 'npm start',
      env: {NODE_ENV:'development'} 
    },
// ### test suite 
    {
      name: 'Example Test Suite',
      prompt: 'T',
      color: 'blue',
      command: 'npm test', 
      env: {NODE_ENV:'test'} 
    }
  ]
}
