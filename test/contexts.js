
var contexts = require('../lib/contexts.js'),
    assert = require('assert');

// Create container

var container = contexts.createContainer();

assert.ok(container);

// Get undefined context

var context = container.getContext({ application: 'Accounting' });

assert.equal(context, null);

// Create and Get context

var context = container.createContext({ application: 'Accounting' });
assert.ok(context);

var result = container.getContext({ application: 'Accounting' });
assert.ok(result);
assert.ok(result === context);

// Create and Get context with two values

var context = container.createContext({ application: 'Accounting', country: 'Japan' });
assert.ok(context);

var result = container.getContext({ application: 'Accounting', country: 'Japan' });
assert.ok(result);
assert.ok(result === context);

// Has Values

assert.ok(context.hasValues({ application: 'Accounting' }));
assert.ok(context.hasValues({ country: 'Japan' }));
assert.ok(context.hasValues({ country: 'Japan', application: 'Accounting' }));

assert.equal(context.hasValues({ application: 'Sales' }), false);
assert.equal(context.hasValues({ country: 'Canada' }), false);

// Get Empty Subject Roles

var result = context.getSubjectRoles('adam');
assert.ok(result);
assert.equal(result.length, 0);

// Add Role and Get Roles

context.addSubjectRole('adam', 'accountant');
var result = context.getSubjectRoles('adam');
assert.ok(result);
assert.equal(result.length, 1);
assert.equal(result[0], 'accountant');
