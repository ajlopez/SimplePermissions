
'use strict';

function Context(values) {
    this.values = { };
    this.subjectPermissions = { };
    this.rolePermissions = { };
    this.length = 0;

    for (var n in values) {
        this.values[n] = values[n];
        this.length++;
    }
}

Context.prototype.getSubjectPermissions = function (name) {
    var permissions = this.subjectPermissions[name];

    return permissions || [];
}

Context.prototype.grantSubjectPermissions = function (name, permissions) {
    var subject = this.subjectPermissions[name];

    if (!subject)
        subject = this.subjectPermissions[name] = [ ];

    if (!Array.isArray(permissions)) {
        if (subject.indexOf(permissions) < 0)
            subject.push(permissions);
    }
    else
        permissions.forEach(function (perm) {
            if (subject.indexOf(perm) < 0)
                subject.push(perm);
        });
}

Context.prototype.getRolePermissions = function (name) {
    var permissions = this.rolePermissions[name];

    return permissions || [];
}

Context.prototype.grantRolePermissions = function (name, permissions) {
    var role = this.rolePermissions[name];

    if (!role)
        role = this.rolePermissions[name] = [ ];

    if (!Array.isArray(permissions)) {
        if (role.indexOf(permissions) < 0)
            role.push(permissions);
    }
    else
        permissions.forEach(function (perm) {
            if (role.indexOf(perm) < 0)
                role.push(perm);
        });
}

Context.prototype.hasValues = function (values) {
    for (var n in values)
        if (this.values[n] !== values[n])
            return false;

    return true;
}

function ContextContainer(engine) {
    var contexts = [ ];

    this.createContext = function (values) {
        var context = new Context(values);
        contexts.push(context);
        return context;
    }

    this.getContext = function (values) {
        var length = 0;

        for (var n in values)
            length++;

        for (var n in contexts) {
            var context = contexts[n];
            if (context.length === length && context.hasValues(values))
                return context;             
        }

        return null;
    }
}

module.exports = {
    createContext: function (values) { return new Context(values); },
    createContainer: function (engine) { return new ContextContainer(engine); }
};