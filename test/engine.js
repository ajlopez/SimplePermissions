
var simplepermissions = require('..'),
    assert = require('assert');

// createEngine is defined

assert.ok(simplepermissions.createEngine);
assert.ok(typeof simplepermissions.createEngine, 'function');

// Create Engine

var engine = simplepermissions.createEngine();

assert.ok(engine);

// It has subjects

assert.ok(engine.subjects());

// It has roles

assert.ok(engine.roles());

// It has contexts

assert.ok(engine.contexts());

