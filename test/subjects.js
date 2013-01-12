
var simplepermissions = require('..'),
    assert = require('assert');

var engine = simplepermissions.createEngine();
var subjects = engine.subjects();

// Granted permissions empty

var context = { application: 'Sales' };
var permissions = subjects.grantedPermissions('adam', context);

assert.ok(permissions);
assert.equal(permissions.length, 0);

// Grant Permission

var context = { application: 'Accounting' };
subjects.grantPermission('adam', 'create account', context);

var permissions = subjects.grantedPermissions('adam', context);

assert.ok(permissions);
assert.equal(permissions.length, 1);
assert.equal(permissions[0], 'create account');