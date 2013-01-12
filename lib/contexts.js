
'use strict';

function newSubject() {
    return { permissions: [], roles: [] }
}

// TODO It is repeated in main js
function addValues(values, newvalues) {
    if (!newvalues)
        return;

    if (!Array.isArray(newvalues)) {
        if (values.indexOf(newvalues) < 0)
            values.push(newvalues);
    }
    else
        for (var k in newvalues) {
            var newvalue = newvalues[k];
            if (values.indexOf(newvalue) < 0)
                values.push(newvalue);
        }
}

function Context(values) {
    this.values = { };
    this.subjects = { };
    this.rolePermissions = { };
    this.length = 0;

    for (var n in values) {
        this.values[n] = values[n];
        this.length++;
    }
}

Context.prototype.getSubjectPermissions = function (name) {
    var subject = this.subjects[name];

    if (!subject || !subject.permissions)
        return [];

    return subject.permissions;
}

Context.prototype.grantSubjectPermissions = function (name, permissions) {
    var subject = this.subjects[name];

    if (!subject)
        subject = this.subjects[name] = newSubject();

    if (!Array.isArray(permissions)) {
        if (subject.permissions.indexOf(permissions) < 0)
            subject.permissions.push(permissions);
    }
    else
        permissions.forEach(function (perm) {
            if (subject.permissions.indexOf(perm) < 0)
                subject.permissions.push(perm);
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

Context.prototype.getSubjectRoles = function (name) {
    var subject = this.subjects[name];

    if (!subject || !subject.roles)
        return [];

    return subject.roles.slice();
}

Context.prototype.addSubjectRole = function (name, role) {
    var subject = this.subjects[name];

    if (!subject)
        subject = this.subjects[name] = newSubject();

    addValues(subject.roles, role);
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