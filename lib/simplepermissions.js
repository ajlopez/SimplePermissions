
'use strict';

var contexts = require('./contexts');

function Subjects(engine) {
    var contexts = engine.contexts();

    this.grantedPermissions = function (name, ctx) {
        var context = contexts.getContext(ctx);
        if (!context)
            return [];
        return context.getSubjectPermissions(name);
    }

    this.grantPermission = function (name, perm, ctx) {
        var context = contexts.getContext(ctx);
        if (!context)
            context = contexts.createContext(ctx);
        return context.grantSubjectPermissions(name, perm);
    }
}

function Engine() {
    this.subjects = function () {
        return subjects;
    };

    this.roles = function () {
        return { };
    };

    this.contexts = function () {
        return contextContainer;
    };

    var contextContainer = contexts.createContainer(this);
    var subjects = new Subjects(this);
}

function createEngine() {
    return new Engine();
}

module.exports = {
    createEngine: createEngine
};