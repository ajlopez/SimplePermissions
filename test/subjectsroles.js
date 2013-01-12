
var simplepermissions = require('..'),
    assert = require('assert');

var engine = simplepermissions.createEngine();
var subjects = engine.subjects();
var roles = engine.roles();

// Get Roles empty

var roles = subjects.getRoles('adam');
assert.ok(roles);
assert.equal(roles.length, 0);

// Add Role to Subject and Get Roles

subjects.addRole('adam', 'accountant');
var roles = subjects.getRoles('adam');
assert.ok(roles);
assert.equal(roles.length, 1);
assert.equal(roles[0], 'accountant');

