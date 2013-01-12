
var simplepermissions = require('..'),
    assert = require('assert');

var engine = simplepermissions.createEngine();
var roles = engine.roles();

// Granted permissions empty

var context = { application: 'Sales' };
var permissions = roles.grantedPermissions('administrator', context);

assert.ok(permissions);
assert.equal(permissions.length, 0);

// Grant Permission

var context = { application: 'Accounting' };
roles.grantPermission('accountant', 'create account', context);

var permissions = roles.grantedPermissions('accountant', context);

assert.ok(permissions);
assert.equal(permissions.length, 1);
assert.equal(permissions[0], 'create account');

// Grant Second Permission

roles.grantPermission('accountant', 'delete account', context);

var permissions = roles.grantedPermissions('accountant', context);

assert.ok(permissions);
assert.equal(permissions.length, 2);
assert.ok(permissions.indexOf('create account') >= 0);
assert.ok(permissions.indexOf('delete account') >= 0);

// Grant Already Granted Permissions

roles.grantPermission('accountant', 'delete account', context);

var permissions = roles.grantedPermissions('accountant', context);

assert.ok(permissions);
assert.equal(permissions.length, 2);
assert.ok(permissions.indexOf('create account') >= 0);
assert.ok(permissions.indexOf('delete account') >= 0);

// Grant Permissions

roles.grantPermission('clerk', ['create invoice', 'delete invoice'], context);

var permissions = roles.grantedPermissions('clerk', context);

assert.ok(permissions);
assert.equal(permissions.length, 2);
assert.ok(permissions.indexOf('create invoice') >= 0);
assert.ok(permissions.indexOf('delete invoice') >= 0);

// Grant Repeated Permissions

roles.grantPermission('manager', ['create invoice', 'delete invoice', 'create invoice', 'delete invoice'], context);

var permissions = roles.grantedPermissions('manager', context);

assert.ok(permissions);
assert.equal(permissions.length, 2);
assert.ok(permissions.indexOf('create invoice') >= 0);
assert.ok(permissions.indexOf('delete invoice') >= 0);
