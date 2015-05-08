Room.prototype.findCreepsOfRole = function(Role) {
    return this.find( FIND_MY_CREEPS, {
        filter: function(object) {
            return object.memory.role == Role;
        }
    });
}