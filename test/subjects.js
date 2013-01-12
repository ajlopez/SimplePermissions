
var simplepermissions = require('..'),
    assert = require('assert');

var engine = simplepermissions.createEngine();
var subjects = engine.subjects();

// Granted permissions empty

var context = { application: 'sales' };
var permissions = subjects.grantedPermissions('adam', context);

assert.ok(permissions);
assert.equal(permissions.length, 0);

// Grant Permission

var context = { application: 'accounting' };
subjects.grantPermission('adam', 'read', context);

var permissions = subjects.grantedPermissions('adam', context);

assert.ok(permissions);
assert.equal(permissions.length, 1);
assert.equal(permissions[0], 'read');