//This module allows you to manage and get distances, 
//like get nearest enemy creep with certain stats.
require("RoomPosition");

Creep.prototype.doJob = function() {
    var Creep = this;
    var Role = this.memory.role;
    
    switch (Role) {
        case 'harvester':
            doJobHarvester(Creep);
            break;
        case 'sprinter':
            doJobSprinter(Creep);
            break;
        case 'builder':
            doJobBuilder(Creep);
            break;
        case 'digger':
            doJobDigger(Creep);
            break;
        case 'hauler':
            doJobDigger(Creep);
            break;
        case 'healer':
            doJobHealer(Creep);
            break;
        default:
            break;
    }
};

function doJobHarvester(Creep) {
    if(Creep.energy < Creep.energyCapacity) {
        //If the creep is holding less energy than it's max,
        //move to the nearest active source and harvest from it.
        
        //Saving the movementTarget in memory prevents
        if(Creep.pos.isNearTo(Creep.memory.movementTarget)) {
            Creep.memory.movementTarget = null;
            if(Creep.pos.findClosest( FIND_SOURCES_ACTIVE ) != null)
                Creep.harvest(Creep.pos.findClosest( FIND_SOURCES_ACTIVE ));
            else
                Creep.memory.movementTarget = null;
        } else {
            if(Creep.memory.movementTarget != null) {
                Creep.moveTo(Creep.memory.movementTarget);
            } else {
                if(Creep.pos.findClosest( FIND_SOURCES_ACTIVE ) != null)
                    Creep.memory.movementTarget = Creep.pos.findClosest( FIND_SOURCES_ACTIVE ).pos;
                else
                    Creep.memory.movementTarget = null;
            }
        }
        
    } else {
        //Else, if the creep's energy stores are full,
        Creep.moveTo(Creep.pos.findClosest( FIND_MY_SPAWNS ));
        Creep.transferEnergy(Creep.pos.findClosest( FIND_MY_SPAWNS ))
    }
}

function doJobSprinter(Creep) {
    //Saving the movementTarget in memory prevents random shuffling.
    if(Creep.pos.isNearTo(Creep.memory.movementTarget)) {
        Creep.memory.movementTarget = null;
        if(Creep.pos.findClosest( FIND_HOSTILE_CREEPS ) != null)
            Creep.attack(Creep.pos.findNearestEnemyBelowHealth(500));
        else if(Creep.pos.findClosest( FIND_HOSTILE_SPAWNS ) != null)
            Creep.attack(Creep.pos.findClosest( FIND_HOSTILE_SPAWNS ));
    } else {
        if(Creep.memory.movementTarget != null) {
            Creep.moveTo(Creep.memory.movementTarget);
        } else {
            if(Creep.pos.findClosest( FIND_HOSTILE_CREEPS ) != null)
                Creep.memory.movementTarget = Creep.pos.findNearestEnemyBelowHealth(500);
            else if(Creep.pos.findClosest( FIND_HOSTILE_SPAWNS ) != null)
                Creep.memory.movementTarget = Creep.pos.findClosest( FIND_HOSTILE_SPAWNS );
        }
    }
}

function doJobBuilder(Creep) {
    if(Creep.energyCapacity == 0) {
        //If the creep is holding no energy
        //move to the nearest spawn and collect from it.
        
        Creep.moveTo(Creep.pos.findClosest( FIND_MY_SPAWNS ));
        Creep.pos.findClosest( FIND_MY_SPAWNS ).transferEnergy(Creep);
        
        //Saving the movementTarget in memory prevents
        if(Creep.pos.isNearTo(Creep.memory.movementTarget)) {
            Creep.memory.movementTarget = null;
            Creep.harvest(Creep.pos.findClosest( FIND_SOURCES_ACTIVE ));
        } else {
            if(Creep.memory.movementTarget != null) {
                Creep.moveTo(Creep.memory.movementTarget);
            } else {
                Creep.memory.movementTarget = Creep.pos.findClosest( FIND_SOURCES_ACTIVE ).pos;
            }
        }
        
    } else {
        //Else, if the creep's energy stores are full,
        Creep.moveTo(Creep.pos.findClosest( FIND_MY_SPAWNS ));
        Creep.transferEnergy(Creep.pos.findClosest( FIND_MY_SPAWNS ));
    }
}