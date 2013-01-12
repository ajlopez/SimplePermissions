
'use strict';

var contexts = require('./contexts');

function addValues(values, newvalues) {
    if (!newvalues)
        return;

    for (var k in newvalues) {
        var newvalue = newvalues[k];
        if (values.indexOf(newvalue) < 0)
            values.push(newvalue);
    }
}

function Subjects(engine) {
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
}

function Roles(engine) {
    var contexts = engine.contexts();

    this.grantedPermissions = function (name, ctx) {
        var context = contexts.getContext(ctx);
        if (!context)
            return [];
        return context.getRolePermissions(name);
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