Spawn.prototype.createCreepWithRole = function(Role) {
    var Spawn = this;
    
    switch(Role) {
        case 'harvester':
            var Data = {
                role: 'harvester',
                hasMovementTarget: false,
            };
            Spawn.createCreep([MOVE, WORK, CARRY], "", Data);
            Spawn
            break;
        case 'sprinter':
            var Data = {
                role: 'sprinter',
                hasMovementTarget: false,
            };
            Spawn.createCreep([MOVE, MOVE, MOVE, ATTACK, TOUGH], "", Data);
            break;
        case 'builder':
            var Data = {
                role: 'builder',
                hasMovementTarget: false,
            };
            Spawn.createCreep([MOVE, WORK, CARRY], "", Data);
            break;
        case 'healer':
            var Data = {
                role: 'healer',
                hasMovementTarget: false,
            };
            Spawn.createCreep([MOVE, WORK, CARRY, CARRY, HEAL], "", Data);
            break;
        case 'digger':
            var Data = {
                role: 'digger',
                hasMovementTarget: false,
            };
            Spawn.createCreep([MOVE, TOUGH, WORK, WORK, WORK], "", Data);
            break;
        case 'hauler':
            var Data = {
                role: 'hauler',
                hasMovementTarget: false,
            };
            Spawn.createCreep([MOVE, MOVE, CARRY, CARRY, CARRY], "", Data);
            break;
        default:
            break;
    }
}