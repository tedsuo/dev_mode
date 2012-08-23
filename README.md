[![build status](https://secure.travis-ci.org/tedsuo/dev_mode.png)](http://travis-ci.org/tedsuo/dev_mode)
# DEV\_MODE
A handy development utility.

## Features

- watch files and directories
- restart a set of processes on file change
- pipe all outputs to a single console

## Installation

    npm install -g dev_mode

## Commands

generate a configuration file:

    dev_mode install 

start dev\_mode:

    dev_mode start

## Dev\_Mode Configuration

configuration file exports an object with the following properties:

**cwd:** _optional_ root path for file watching, defaults to the current directory

**watch_list:** array of files and folders to watch

**recursive\_watch\_list:** array of files and folders to watch

**processes:** array of process configurations

### Process Configuration

The following options are available for each item in the processes list:

#### Console Options

**name:** name to display in console

**prompt:** prompt to display in console

**color:** prompt color

**bg\_color:** _optional_ prompt background color if you're into that sort of thing

#### Command options

**command:** command to invoke (including command-line arguments)

**env:** _optional_ environment variables to pass to process

**cwd:** _optional_ directory to invoke the process from, if different from current directory

**on\_startup:** _optional_ set to false if you would only like this process invoked after a file change
