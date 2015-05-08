//Resource Collector
console.log("Welcome to MasterEric's Screeper v1.0");

//Creep roles are the specialty written to memory on spawn.
//Creep jobs are the different tasks creeps do, coded in the CreepJobs module.
//Different creep roles have different jobs.
//This module manages creep jobs based on roles.
require("CreepJobs"); 
//This module allows you to easily create and manage creeps with different jobs.
require("SpawnJobs"); 
//This module allows you to manage creeps in the room,
//like get all creeps of one job.
require("RoomJobs");
//This module allows you to manage and get distances, 
//like get nearest enemy creep with certain stats.
require("RoomPosition");

var LimitManager = {
    limit_harvester: 2,
    limit_builder: 0,
    limit_digger: 0,
    limit_hauler: 0,
    limit_healer: 0,
    limit_sprinter: 2
}

//For each room...
for (var i in Game.rooms) {
    var Room = Game.rooms[i];
    console.log("Room: "+Room .name);
    //Creeps in current room.
    console.log("  Roles:");
    console.log("    Harvesters (120E): " + Room.findCreepsOfRole('harvester').length+"/"+LimitManager.limit_harvester);
    console.log("    Builders (120E): " + Room.findCreepsOfRole('builder').length+"/"+LimitManager.limit_builder);
    console.log("    Diggers (?E): " + Room.findCreepsOfRole('digger').length+"/"+LimitManager.limit_digger);
    console.log("    Haulers (250E): " + Room.findCreepsOfRole('hauler').length+"/"+LimitManager.limit_builder);
    console.log("    Healers (370E): " + Room.findCreepsOfRole('healer').length+"/"+LimitManager.limit_healer);
    console.log("    Fighters: ");
    console.log("      Sprinters (250E): " + Room.findCreepsOfRole('sprinter').length+"/"+LimitManager.limit_sprinter);
    
    //Find the creeps in that room.
    var FriendlyCreeps = Room.find( FIND_MY_CREEPS );
    //Do something with each friendly creep.
    FriendlyCreeps.forEach ( function(Creep) {
        //Creep is passed into the function.
    
        console.log("  Creep: "+Creep.name.toString()+", "+Creep.memory.role+", "+Creep.energy+"/"+Creep.energyCapacity+"E "+Creep.hits+"/"+Creep.hitsMax+"HP");
        
        Creep.doJob();
    });
    
    var FriendlySpawns = Room.find( FIND_MY_SPAWNS );
    FriendlySpawns.forEach ( function(Spawn) {
        console.log("  Spawn: "+Spawn.name.toString());
        console.log("    Energy: " + Spawn.energy+"/"+Spawn.energyCapacity);
        
        //If the spawn is not currently creating a creep...
        if(Spawn.spawning == null) {
            if(Room.findCreepsOfRole('sprinter').length < LimitManager.limit_sprinter) {
                Spawn.createCreepWithRole('sprinter');
            }
            if(Room.findCreepsOfRole('digger').length < LimitManager.limit_digger) {
                Spawn.createCreepWithRole('digger');
            }
            if(Room.findCreepsOfRole('hauler').length < LimitManager.limit_hauler) {
                Spawn.createCreepWithRole('hauler');
            }            
            if(Room.findCreepsOfRole('harvester').length < LimitManager.limit_harvester) {
                Spawn.createCreepWithRole('harvester');
            }
            if(Room.findCreepsOfRole('builder').length < LimitManager.limit_builder) {
                Spawn.createCreepWithRole('builder');
            }
            if(Room.findCreepsOfRole('healer').length < LimitManager.limit_healer) {
                Spawn.createCreepWithRole('healer');
            }
        }
    });
}