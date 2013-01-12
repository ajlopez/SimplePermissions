# SimplePermissions

Permissions by Subject, Role, and Context. It uses an in-memory model.

## Concepts

- Subject: A person or automated agent
- Role: Job function or title which defines an authority level
- Permission: An approval of a mode of access to a resource
- Context: A set of values to describe the context where permissions and other attributes are assigned

Source [Role-based access control](http://en.wikipedia.org/wiki/Role-based_access_control). The main difference is that
`SimplePermissions` has contexts.

Subjects and Roles are identified by a simple (and unique) name. Permissions are simple strings. Contexts are simple objects
with properties and their values.

## Installation

Via npm on Node:

```
npm install simplepermissions
```

## Usage

Reference in your program:

```js
var simplepermissions = require('simplepermissions');
var engine = simplepermissions.createEngine();
var subjects = engine.subjects();
var roles = engine.roles();
```

Grant subject permissions, in a context:
```js
subjects.grantPermission(subjectId, permission(s), context);
```

Examples:
```js
subjects.grantPermission('adam', 'create account', 
    { application: 'Accounting' });
subjects.grantPermission('alice', 'print invoice', 
    { application: 'Sales', country: 'Argentina' });
subjects.grantPermission('albert', ['create order', 'print order'], 
    { application: 'Purchases', country: 'Australia' });
```

Retrieve subject granted permissions in a context:
```js
var permissions = subjects.grantedPermission('adam', { application: 'Accounting' });
permissions.forEach(function (permission) { console.log(permission); });
```

Grant role permissions, in a context:
```js
roles.grantPermission(roleId, permission(s), context);
```

Examples:
```js
roles.grantPermission('accountant', 'create account', 
    { application: 'Accounting' });
roles.grantPermission('clerk', 'print invoice', 
    { application: 'Sales', country: 'Argentina' });
roles.grantPermission('manager', ['create order', 'print order'], 
    { application: 'Purchases', country: 'Australia' });
```

Retrieve role granted permissions in a context:
```js
var permissions = roles.grantedPermission('accountant', { application: 'Accounting' });
permissions.forEach(function (permission) { console.log(permission); });
```
The returned value is an array with the permission values. If no permission was granted, the empty array `[]` is returned.

## Persistence?

Persistence is an orthogonal problem. You must reify the engine from your persistence store, and update their values.

## Development

```
git clone git://github.com/ajlopez/SimplePermissions.git
cd SimplePermissions
npm install
npm test
```

## Samples

TBD

## To do

- Samples
- Revoke permissions
- Remove permissions
- Better context organization and retrieval, to support thousands of values
- Roles assigned to Subjects by Context
- Permissions inherited by Context

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimplePermissions) and submit
[pull requests](https://github.com/ajlopez/SimplePermissions/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

