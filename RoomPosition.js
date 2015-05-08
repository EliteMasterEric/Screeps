RoomPosition.prototype.findNearestEnemyBelowHealth = function(Threshold) {
    return this.findClosest( FIND_HOSTILE_CREEPS, {
        filter: function(object) {
            return (object.hits <= Threshold);
        }
    });
}

RoomPosition.prototype.findNearestSpawnNeedEnergy = function(Threshold) {
    return this.findClosest( FIND_MY_SPAWNS, {
        filter: function(object) {
            return ((object.energyCapacity-object.energy) <= Threshold);
        }
    });
}

RoomPosition.prototype.findNearestSpawnHaveEnergy = function(Threshold) {
    return this.findClosest( FIND_MY_SPAWNS, {
        filter: function(object) {
            return (object.energy >= Threshold);
        }
    });
}



//Find the nearest source that has at least Threshold creeps of role Role within Radius tiles of it. If Role is null, any creep role will count.
RoomPosition.prototype.findNearestSourceHaveRole = function(Radius, Threshold, Role) {
    return this.findClosest( FIND_SOURCES_ACTIVE, {
        filter: function(object) {
            return (object.pos.getCreepRoleCountRadius(Radius, Role) >= Threshold) ;
        }
    });
}

//Find the nearest source that has Threshold blank spaces within Radius tiles of it.
RoomPosition.prototype.findNearestSourceWithSpace = function(Radius, Threshold) {
    return this.findClosest( FIND_SOURCES_ACTIVE, {
        filter: function(object) {
            //Get the number of non-wall tiles within the radius.
            var Count = this.getTerrainCountRadius(1, 'wall')+this.getTerrainCountRadius(1, 'swamp');
            Count -= this.getCreepRoleCountRadius(Radius)
            return (Count >= Threshold);
        }
    });
}

//Threshold is a percentage out of 1.00 for how damaged the structure has to be.
RoomPosition.prototype.findNearestDamagedStructure = function(Threshold) {
    return this.findClosest( FIND_MY_STRUCTURES, {
        filter: function(object) {
            //Get the number of non-wall tiles within the radius.
            return this.hits < (this.hitsMax * Threshold);
        }
    });
}

//Threshold is a percentage out of 1.00 for how damaged the structure has to be.
RoomPosition.prototype.findNearestDamagedCreep = function(Threshold) {
    return this.findClosest( FIND_MY_CREEPS, {
        filter: function(object) {
            //Get the number of non-wall tiles within the radius.
            return this.hits < (this.hitsMax * Threshold);
        }
    });
}

//Return role of creep on tile, if any.
RoomPosition.prototype.getCreepRole = function() {
    return (Game.rooms[this.roomName]).lookForAt('creep', this).memory.role;
}

//Return an array of creeps in the radius.
RoomPosition.prototype.getCreepRadius = function(Radius) {
    return Game.rooms[this.roomName].lookForAtArea('creep', (this.y - Radius), (this.x - Radius), (this.y + Radius), (this.x + Radius));
}

//Return an array of creeps in the area.
RoomPosition.prototype.getCreepArea = function(Top, Left, Bottom, Right) {
    return Game.rooms[this.roomName].lookForAtArea('creep', Top, Left, Bottom, Right);
}

//Return an array of creep roles in the radius.
RoomPosition.prototype.getCreepRoleRadius = function(Radius) {
    var Array = Game.rooms[this.roomName].lookForAtArea('creep', (this.y - Radius), (this.x - Radius), (this.y + Radius), (this.x + Radius));
    var Roles = {};
    for(var i in Array)
        for(var j in Array[i])
            if(Array[i][j].memory.role != null)
                Roles[i][j] = Array[i][j].memory.role;
    
    return Roles;
}

//Return an array of creep roles in the area.
RoomPosition.prototype.getCreepRoleArea = function(Top, Left, Bottom, Right) {
    var Array = Game.rooms[this.roomName].lookForAtArea('creep', Top, Left, Bottom, Right);
    var Roles = {};
    for(var i in Array)
        for(var j in Array[i])
            if(Array[i][j].memory.role != null)
                Roles[i][j] = Array[i][j].memory.role;
    
    return Roles;
}

//Return the number of the given creep role in the given area. If Type is not given, count creeps of any role.
RoomPosition.prototype.getCreepRoleCountArea = function(Top, Left, Bottom, Right, Type) {
    var Array = this.getCreepRoleArea(Top, Left, Bottom, Right);
    var Counter = 0;
    for(var i in Array)
        for(var j in Array[i])
            if( Type == null || Array[i][j] == Type)
                Counter++;
    
    return Counter;
}

//Return the number of the given creep role in the given radius. If Type is not given, count creeps of any role.
RoomPosition.prototype.getCreepRoleCountRadius = function(Radius, Type) {
    var Array = this.getCreepRoleRadius(Radius);
    var Counter = 0;
    for(var i in Array)
        for(var j in Array[i])
            if(Type == null || Array[i][j] == Type)
                Counter++;
    
    return Counter;
}

//Return terrain type of a tile.
RoomPosition.prototype.getTerrain = function() {
    return (Game.rooms[this.roomName]).lookForAt('terrain', this);
}

//Return an array of terrain types.
RoomPosition.prototype.getTerrainRadius = function(Radius) {
    return Game.rooms[this.roomName].lookForAtArea('terrain', (this.y - Radius), (this.x - Radius), (this.y + Radius), (this.x + Radius));
}

//Return the number of the given terrain type in the given area.
RoomPosition.prototype.getTerrainCountArea = function(Top, Left, Bottom, Right, Type) {
    var Array = Game.rooms[this.roomName].lookForAtArea('terrain', Top, Left, Bottom, Right);
    var Counter = 0;
    for(var i in Array)
        for(var j in Array[i])
            if(Array[i][j] == Type)
                Counter++;
    
    return Counter;
}

//Return the number of the given terrain type in the given radius.
RoomPosition.prototype.getTerrainCountRadius = function(Radius, Type) {
    var Array = this.getTerrainRaidus(Radius);
    var Counter = 0;
    for(var i in Array)
        for(var j in Array[i])
            if(Array[i][j] == Type)
                Counter++;
    
    return Counter;
}