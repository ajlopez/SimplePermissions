
'use strict';

function Context(values) {
    this.values = { };
    this.subjectPermissions = { };
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
        this.subjectPermissions[name] = subject.concat(permissions);
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