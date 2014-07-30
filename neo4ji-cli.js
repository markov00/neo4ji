#!/usr/bin/env node

var neo4ji = require(__dirname + '/neo4ji.js');

var args = require('minimist')(process.argv.slice(2));
var command = args._[0];
var instanceName = args._[1];

switch(command){

case "create":
    console.log('creating: ' + instanceName + '...');
    neo4ji.createInstance(instanceName, args.V, args.D);
    break;

case "destroy":
    console.log('destroying: ' + instanceName + '...');
    neo4ji.destroyInstance(instanceName);
    break;

case "start":
    console.log('starting: ' + instanceName + '...');
    neo4ji.startInstance(instanceName, args.V);
    break;

case "stop":
    console.log('stopping: ' + instanceName + '...');
    neo4ji.stopInstance(instanceName);
    break;

case "instances":
    console.log(JSON.stringify(neo4ji.instances(), null, 4));
    break;

case "config":
    if(args.V){
        neo4ji.config({neo4jVersion:args.V});
        console.log('updated configuration:')
        console.log(JSON.stringify(neo4ji.config(), null, 4));
    }else{
        console.log('\tno options updated');
        console.log('usage: ');
        console.log('\tconfig -V <version> -D <DB path>\t\t: set the default version');
    }
    break;

default:
    console.log('Usage: neo4ji-cli <action> [name] [options]');

    console.log('General Actions:');
    console.log('\tconfig\t\t: set the default neo4j version');
    console.log('\tinstances\t: list all instances');

    console.log('Instance Actions:');
    console.log('\tcreate\t\t: create a new instance with the given name');
    console.log('\tdestroy\t\t: destroy instance with the given name');
    console.log('\tstart\t\t: start instance with the given name');
    console.log('\tstop\t\t: stop instance with the given name');


    console.log('Options:');

    console.log('\t-V <version>\t: neo4j version');
    console.log('\t-D <DB path> \t: neo4j database path, relative path are relative to the newly created neo4j instance');

    break;

}

console.log('done.');

process.exit(0);
