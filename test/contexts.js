
var contexts = require('../lib/contexts.js'),
    assert = require('assert');

// Create container

var container = contexts.createContainer();

assert.ok(container);

// Get undefined context

var context = container.getContext({ application: 'accounting' });

assert.equal(context, null);

// Create and Get context

var context = container.createContext({ application: 'accounting' });
assert.ok(context);

var result = container.getContext({ application: 'accounting' });
assert.ok(result);
assert.ok(result === context);

// Create and Get context with two values

var context = container.createContext({ application: 'accounting', country: 'Japan' });
assert.ok(context);

var result = container.getContext({ application: 'accounting', country: 'Japan' });
assert.ok(result);
assert.ok(result === context);

// Has Values

assert.ok(context.hasValues({ application: 'accounting' }));
assert.ok(context.hasValues({ country: 'Japan' }));
assert.ok(context.hasValues({ country: 'Japan', application: 'accounting' }));

assert.equal(context.hasValues({ application: 'sales' }), false);
assert.equal(context.hasValues({ country: 'Canada' }), false);