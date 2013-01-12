
'use strict';

var contexts = require('./contexts');

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

function Subjects(engine) {
    var subjects = { };
    var contexts = engine.contexts();

    this.grantedPermissions = function (name, ctx) {
        var result = [];
        var context = contexts.getContext(ctx);
        if (context)
            addValues(result, context.getSubjectPermissions(name));
        return result;
    }

    this.grantPermission = function (name, perm, ctx) {
        var context = contexts.getContext(ctx);
        if (!context)
            context = contexts.createContext(ctx);
        return context.grantSubjectPermissions(name, perm);
    }

    this.addRole = function (name, role) {
        var subject = subjects[name];
        if (!subject)
            subject = subjects[name] = { roles: [] };
        addValues(subject.roles, role);
    }

    this.getRoles = function (name) {
        var subject = subjects[name];
        if (!subject)
            return [];
        return subject.roles.slice();
    }
}

function Roles(engine) {
    var contexts = engine.contexts();

    this.grantedPermissions = function (name, ctx) {
        var result = [];
        var context = contexts.getContext(ctx);
        if (context)
            addValues(result, context.getRolePermissions(name));
        return result;
    }

    this.grantPermission = function (name, perm, ctx) {
        var context = contexts.getContext(ctx);
        if (!context)
            context = contexts.createContext(ctx);
        return context.grantRolePermissions(name, perm);
    }
}

function Engine() {
    this.subjects = function () {
        return subjects;
    };

    this.roles = function () {
        return roles;
    };

    this.contexts = function () {
        return contextContainer;
    };

    var contextContainer = contexts.createContainer(this);
    var subjects = new Subjects(this);
    var roles = new Roles(this);
}

function createEngine() {
    return new Engine();
}

module.exports = {
    createEngine: createEngine
};