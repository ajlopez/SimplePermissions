
var simplepermissions = require('..'),
    assert = require('assert');

var engine = simplepermissions.createEngine();
var subjects = engine.subjects();
var roles = engine.roles();

// Get Roles empty

var adamroles = subjects.getRoles('adam', { application: 'Accounting' });
assert.ok(adamroles);
assert.equal(adamroles.length, 0);

// Add Role to Subject and Get Roles

subjects.addRole('adam', 'accountant', { application: 'Accounting' });
var adamroles = subjects.getRoles('adam', { application: 'Accounting' });
assert.ok(adamroles);
assert.equal(adamroles.length, 1);
assert.equal(adamroles[0], 'accountant');

// Empty roles in other context

var adamroles = subjects.getRoles('adam', { application: 'Purchases' });
assert.ok(adamroles);
assert.equal(adamroles.length, 0);

// Grant Permission to Role, Get as Granted Permission for Subject

roles.grantPermission('accountant', 'create account', { application: 'Accounting' });
var permissions = subjects.grantedPermissions('adam', { application: 'Accounting' });
assert.ok(permissions);
assert.equal(permissions.length, 1);
assert.equal(permissions[0], 'create account');

// Grant Permision to Subject, Get all permissions

subjects.grantPermission('adam', 'delete account', { application: 'Accounting' });
var permissions = subjects.grantedPermissions('adam', { application: 'Accounting' });
assert.ok(permissions);
assert.equal(permissions.length, 2);
assert.ok(permissions.indexOf('create account') >= 0);
assert.ok(permissions.indexOf('delete account') >= 0);
